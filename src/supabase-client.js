import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "YOUR_SUPABASE_URL"; // Replace with your Supabase URL
const supabaseAnonKey =     "YOUR_SUPABASE_ANON_KEY"; // Replace with your Supabase Anon Key
// Note: You can find these values in your Supabase project settings under API.


const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
