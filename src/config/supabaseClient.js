import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ykwxtghfbbpdomzjnvzm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrd3h0Z2hmYmJwZG9tempudnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NzAwNTYsImV4cCI6MjA2MTA0NjA1Nn0.I7Pz7GuxGT5TSMuMExjDATi2O2IRCki2kkzVrk90q_E";

export const supabase = createClient(supabaseUrl,supabaseKey)