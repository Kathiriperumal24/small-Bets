import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zavpbveodbaviolvulwz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphdnBidmVvZGJhdmlvbHZ1bHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2OTI0MTgsImV4cCI6MjA1NzI2ODQxOH0.2TTot4ZphPNGcDwtEhbDsFqHlx3vc9LtttogRDNfifI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
