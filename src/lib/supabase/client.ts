import { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'

export const supaBrowserClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)
