import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createServerSupabaseClient() {
  if (!url || !(serviceRoleKey || anonKey)) {
    return null;
  }

  return createClient(url, serviceRoleKey ?? anonKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export const serverSupabaseReadiness = {
  connected: Boolean(url && (serviceRoleKey || anonKey)),
  urlConfigured: Boolean(url),
  anonKeyConfigured: Boolean(anonKey),
  serviceRoleConfigured: Boolean(serviceRoleKey),
};
