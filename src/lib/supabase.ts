import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qwsgtmzpirrbnmcbdvue.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3c2d0bXpwaXJyYm5tY2JkdnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDUzMjQsImV4cCI6MjA5NTgyMTMyNH0.RFb45xZjY3pDV4QWgr9-ASta84bX09fIcbv7ZZlY_mk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
      global: {
        headers: {
          'X-Client-Info': 'supabase-js/web',
        },
      },
    });

export interface Reservation {
  id?: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  adresse_depart: string;
  adresse_arrivee: string;
  distance_km?: number;
  temps_trajet?: string;
  date_rdv: string;
  heure_rdv: string;
  ald_cmu: boolean;
  prescription_medicale: boolean;
  statut?: string;
  created_at?: string;
}
