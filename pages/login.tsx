import { modalAuthState } from '@/atoms'
import AuthModal from '@/components/auth/Modal'
import { useAuth } from '@/hooks'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

const LoginPage = () => {
  const [_, setOpen] = useRecoilState(modalAuthState)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) setOpen(true)
  }, [user])

  return (
    <div className="mx-auto flex h-screen max-w-screen-sm items-center justify-center">
      {user ? (
        <Link href="/dashboard">
          <button className="btn w-full">Dashboard</button>
        </Link>
      ) : (
        <button className="btn w-full" onClick={() => setOpen(true)}>
          Login
        </button>
      )}
      <AuthModal />
    </div>
  )
}

export default LoginPage
