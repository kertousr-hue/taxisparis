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
    authUserId: authUser.id,
    email: authUser.email || storedUser.email,
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

    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;

      const storedUser = readStoredAdminUser();
      const authUser = data.session?.user;

      if (sessionMatchesStoredAdmin(storedUser, authUser) && storedUser && authUser) {
        setUser(buildSessionAdminUser(storedUser, authUser));
      } else if (authUser && isAllowedAuthAdmin(authUser.email)) {
        const adminUser = buildAuthAdminUser(authUser);
        setUser(adminUser);
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
      } else if (storedUser && !authUser) {
        setUser(storedUser);
      } else {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
        setUser(null);
      }

      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const storedUser = readStoredAdminUser();
      const authUser = session?.user;

      if (sessionMatchesStoredAdmin(storedUser, authUser) && storedUser && authUser) {
        setUser(buildSessionAdminUser(storedUser, authUser));
        return;
      }

      if (authUser && isAllowedAuthAdmin(authUser.email)) {
        const adminUser = buildAuthAdminUser(authUser);
        setUser(adminUser);
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
        return;
      }

      if (storedUser && !authUser) {
        setUser(storedUser);
        return;
      }

      localStorage.removeItem(ADMIN_STORAGE_KEY);
      setUser(null);
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

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!authError && authData.user && isAllowedAuthAdmin(authData.user.email)) {
      const adminUser = buildAuthAdminUser(authData.user);
      setUser(adminUser);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
      return;
    }

    await supabase.auth.signOut();

    const { data, error } = await supabase.rpc('admin_login', {
      p_email: email,
      p_password: password,
    });

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error('Identifiants admin incorrects.');
    }

    const adminProfile = data[0] as Omit<AdminUser, 'authUserId'>;
    const adminUser: AdminUser = {
      id: adminProfile.id,
      email: adminProfile.email || email,
      name: adminProfile.name || 'Admin',
      role: adminProfile.role || 'admin',
    };

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
