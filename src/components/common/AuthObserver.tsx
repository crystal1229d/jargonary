'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/store/user'
import { createClient } from '@/lib/supabase/browser-client'

const AuthObserver = () => {
  console.log('[AuthObserver] Rendered')

  const supabase = createClient()
  const setUser = useUserStore((state) => state.setUser)
  const clearUser = useUserStore((state) => state.clearUser)

  useEffect(() => {
    // auth 상태 변경 감지
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[AuthObserver] EVENT : ', event)
      console.log('[AuthObserver] SESSION : ', session)
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        if (session?.user) {
          console.log(
            '[AuthObserver] SIGNED IN or INITIAL_SESSION :',
            event,
            session?.user,
          )
          setUser({
            id: session.user.id,
            email: session.user.email ?? '',
          })
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('[AuthObserver] Clearing user')
        clearUser()
      }
    })

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      data.subscription.unsubscribe()
    }
  }, [setUser, clearUser, supabase.auth])

  useEffect(() => {
    // 초기 유저 상태 확인
    const fetchInitialUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      console.log('[AuthObserver] Initial session:', session?.user)

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
        })
      } else {
        clearUser()
      }
    }

    fetchInitialUser()
  }, [setUser, clearUser, supabase.auth])

  return null
}

export default AuthObserver
