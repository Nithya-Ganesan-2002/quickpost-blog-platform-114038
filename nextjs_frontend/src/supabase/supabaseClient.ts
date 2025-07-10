import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

// PUBLIC_INTERFACE
/**
 * Returns a singleton Supabase client for use across the app.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
