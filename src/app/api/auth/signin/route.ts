import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server-client'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { email, password } = await req.json()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 401 })
  }

  return NextResponse.json({ user: data.user }, { status: 200 })
}
