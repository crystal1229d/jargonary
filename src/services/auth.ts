'use server'

import { createClient } from '@/lib/supabase/server-client'
import { useUserStore } from '@/store/user'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signin(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: userData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw new Error(error.message)
  }

  console.log('signin-> userData : ', userData)
  useUserStore.getState().setUser({
    id: userData.user.id,
    email: userData.user.email as string,
  })

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    throw new Error(error.message)
    // redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export const signout = async () => {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }

  useUserStore.getState().clearUser()

  redirect('/signin')
}
