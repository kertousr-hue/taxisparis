import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AdminUser {
  id: string;
  authUserId: string;
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
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

function normalizeEmail(email?: string | null) {
  return (email || '').trim().toLowerCase();
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

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      throw new Error('Connexion admin refusee par Supabase Auth. Verifiez que ce compte existe dans Authentication > Users.');
    }

    const { data, error } = await supabase.rpc('admin_login', {
      p_email: email,
      p_password: password,
    });

    if (error || !data || data.length === 0) {
      await supabase.auth.signOut();
      throw new Error("Compte connecte, mais non autorise dans l'admin du site.");
    }

    const adminProfile = data[0] as Omit<AdminUser, 'authUserId'>;
    const adminUser: AdminUser = {
      id: adminProfile.id,
      authUserId: authData.user.id,
      email: adminProfile.email || authData.user.email || email,
      name: adminProfile.name || authData.user.email || 'Admin',
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
