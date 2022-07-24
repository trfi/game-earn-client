import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface AuthProps {
  children: any
}

export function AuthAdmin({ children }: AuthProps) {
  const router = useRouter()
  const { user, firstLoading } = useAuth()

  console.log(![1, 2].includes(user?.role));

  useEffect(() => {
    if (!firstLoading && ![1, 2].includes(user?.role)) router.push('/')
  }, [router, user, firstLoading])

  if (!user?.username) return <p>Loading...</p>

  return <div>{children}</div>
}
