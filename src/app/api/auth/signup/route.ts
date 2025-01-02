import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server-client'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { email, password } = await req.json()

  const data = { email, password }
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 401 })
  }

  return NextResponse.json(
    { message: 'Signed up successfully' },
    { status: 200 },
  )
}
