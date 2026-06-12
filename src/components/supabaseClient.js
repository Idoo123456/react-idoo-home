import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tcsxovrkowvolmpeyeyg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjc3hvdnJrb3d2b2xtcGV5ZXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDUwNTAsImV4cCI6MjA5NjUyMTA1MH0.lUAok5DEZ_Jac9BXwEpi-Xf_uVRBwWwncWquX3-5g68';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);