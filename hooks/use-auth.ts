import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { authApi } from '@/api'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/dist/types'

interface UserInfo {
  dealerBalance: number
  currentPack: number
  balance: number
  email: string,
  commissionBalance: number
  commissionUpTo: number
  totalRef: number
  referralChild: string[]
  withdrawalInfo: { payAddress: string, payNetwork: string }
  username: string
  firstExchange: boolean
  shareholderLevel: number
  role: number
  id: string
}

// Auth --> Protected Pages
// <Auth>{children}</Auth>
export function useAuth(
  { middleware }: any = {},
  options?: Partial<PublicConfiguration>
) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)

  const {
    data: user,
    error,
    mutate,
  } = useSWR('/auth', {
    dedupingInterval: 60 * 60 * 1000, // 1hr
    revalidateOnFocus: false,
    ...options,
  })

  const firstLoading = user === undefined && error === undefined

  async function login(
    loginData: { username: string; password: string }
  ) {
    await authApi
      .login(loginData)
    await mutate()
  }

  async function signup(
    loginData: { email:string, username: string; password: string, confirmPassword: string, referral: string }
  ) {
    await authApi
      .signup(loginData)

    await mutate()
  }

  async function logout() {
    await authApi.logout()
    mutate(null, false)
    window.location.href = '/'
  }

  useEffect(() => {
    if (user || error) setIsLoading(false)
    if (middleware == 'guest' && user) router.push('/play')
    if (middleware == 'auth' && error) router.push('/login')
  })

  return {
    user: user as UserInfo,
    error,
    login,
    signup,
    logout,
    mutate,
    isLoading,
    firstLoading,
  }
}
