// postgresql://postgres.scctkwvgbfovgllwkbqw:[YOUR-PASSWORD]@aws-0-eu-north-1.pooler.supabase.com:6543/postgres
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);