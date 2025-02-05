import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

let supabaseInstance: ReturnType<typeof createServerClient> | null = null

export async function createClient() {
  if (supabaseInstance) return supabaseInstance
  const cookieStore = await cookies()

  supabaseInstance = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
            console.error(error)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
            console.error(error)
          }
        },
      },
    },
  )

  return supabaseInstance
}
