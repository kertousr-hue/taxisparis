import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AdminUser {
  id: string;
  authUserId?: string;
  email: string;
  name: string;
  role: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const ADMIN_STORAGE_KEY = 'admin_user';
const AUTH_ADMIN_EMAILS = ['kertous.r@gmail.com'];
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

function normalizeEmail(email?: string | null) {
  return (email || '').trim().toLowerCase();
}

function isAllowedAuthAdmin(email?: string | null) {
  return AUTH_ADMIN_EMAILS.includes(normalizeEmail(email));
}

function readStoredAdminUser() {
  const storedUser = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as AdminUser;
  } catch {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    return null;
  }
}

function buildSessionAdminUser(storedUser: AdminUser, authUser: SupabaseUser): AdminUser {
  return {
    ...storedUser,
    id: authUser.id,
    authUserId: authUser.id,
    email: authUser.email || storedUser.email,
    role: 'admin',
  };
}

function buildAuthAdminUser(authUser: SupabaseUser): AdminUser {
  return {
    id: authUser.id,
    authUserId: authUser.id,
    email: authUser.email || AUTH_ADMIN_EMAILS[0],
    name: 'Administrateur',
    role: 'admin',
  };
}

function sessionMatchesStoredAdmin(storedUser: AdminUser | null, authUser?: SupabaseUser | null) {
  if (!storedUser || !authUser) return false;
  return normalizeEmail(storedUser.email) === normalizeEmail(authUser.email);
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const applySession = (authUser?: SupabaseUser | null) => {
      if (!authUser || !isAllowedAuthAdmin(authUser.email)) {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
        setUser(null);
        return;
      }

      const storedUser = readStoredAdminUser();
      const adminUser = sessionMatchesStoredAdmin(storedUser, authUser) && storedUser
        ? buildSessionAdminUser(storedUser, authUser)
        : buildAuthAdminUser(authUser);

      setUser(adminUser);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
    };

    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;

      applySession(data.session?.user);
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      applySession(session?.user);
    });

    syncSession();

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    setUser(null);
    await supabase.auth.signOut();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user || !isAllowedAuthAdmin(data.user.email)) {
      await supabase.auth.signOut();
      throw new Error('Identifiants admin incorrects.');
    }

    const adminUser = buildAuthAdminUser(data.user);
    setUser(adminUser);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
  };

  const signOut = async () => {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    setUser(null);
    await supabase.auth.signOut();
  };

  return (
    <AdminAuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
