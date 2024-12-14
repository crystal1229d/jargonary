export interface User {
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
  id: string
  email: string
  firstName: string
  lastName: string
  nickname?: string
  profileImg?: string
  createdAt: string
}

export interface SignForm {
  email: User['email']
  password: string
}
