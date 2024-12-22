import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://pvxhdblahjsbnzjeymjg.supabase.co/";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2eGhkYmxhaGpzYm56amV5bWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NzE1NzUsImV4cCI6MjA1MDQ0NzU3NX0.KOQVbR8mE14y6EN9k11RrSrnegRPbBRs867nV4X-5Rw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
