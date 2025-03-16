import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://apzngtithgbiabilchwr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwem5ndGl0aGdiaWFiaWxjaHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDYwODcsImV4cCI6MjA1NzcyMjA4N30.5kkiSEpDxNJRz-wNsZl8xa0euS-x3JE7YF1Oh9daQNY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
