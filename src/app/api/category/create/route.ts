import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server-client'

export async function POST(request: Request) {
  const { name, color, icon } = await request.json()

  if (!name || !color || !icon) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 },
    )
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('category')
    .insert({
      user_id: user.id,
      name,
      color,
      icon,
      word_count: 0,
    })
    .single()

  if (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { message: 'Failed to create category' },
      { status: 500 },
    )
  }

  return NextResponse.json(data, { status: 201 })
}
