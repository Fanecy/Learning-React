import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vydgmeanfgkjybbnwznn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5ZGdtZWFuZmdranliYm53em5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzA2NzYsImV4cCI6MjA4MDUwNjY3Nn0.UM_NtS4AJAyeZIec7hyt3ZWwpPKy0k0Gy0SvF661KL4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
