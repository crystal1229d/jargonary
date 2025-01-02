import { Metadata } from 'next'

export interface User {
  id: Auth['uid']
  email: Auth['email']
}
export interface SignInForm {
  email: Auth['email']
  password: string
}

/* Supabase */
export interface Auth {
  uid: string
  displayName: string
  email: string
  phone: string
  providers: string
  providerType: string
  createdAt: string
  LastSignInAt: string
}

export interface Profile {
  id: Auth['uid']
  email: Auth['email']
  firstName: string
  lastName: string
  nickname?: string
  profileImg?: string
  createdAt: string
}

export interface UserIdentity {
  id: string
  provider: string
  created_at: string
  updated_at: string
}
export interface SupabaseUser {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string | null
  phone: string
  phone_confirmed_at: string | null
  confirmed_at: string | null
  last_sign_in_at: string | null
  app_metadata: {
    provider: string
    providers: string[]
  }
  user_metadata: Record<string, Metadata>
  identities: UserIdentity[]
  created_at: string
  updated_at: string
  is_anonymous: boolean
}
