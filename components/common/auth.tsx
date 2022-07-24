import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface AuthProps {
  children: any
}

export function Auth({ children }: AuthProps) {
  const router = useRouter()
  const { user, firstLoading } = useAuth()

  useEffect(() => {
    if (!firstLoading && !user?.username) router.push('/')
  }, [router, user, firstLoading])

  if (!user?.username) return <p>Loading...</p>

  return <div>{children}</div>
}
