import { useRecoilState } from 'recoil'
import { modalAuthState } from '@/atoms'
import AuthModal from '@/components/auth/Modal'
import { useAuth } from '@/hooks'
import Link from 'next/link'

export const Header = () => {
  const [_, setOpen] = useRecoilState(modalAuthState)
  const { user } = useAuth()

  return (
    <header className="fixed w-full bg-white shadow-md">
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4 ">
        <div className="cursor-pointer w-36">
          <img src="/logo.png" alt="logo" />
        </div>
        <ul className="hidden gap-16 font-semibold md:flex">
          <li className="text-primary">
            <a href="/">Home</a>
          </li>
          <li className="hover:text-primary">
            <a href="#about">About</a>
          </li>
          <li className="hover:text-primary">
            <a href="#contact">Contact</a>
          </li>
          <li className="hover:text-primary cursor-pointer">
            {user ? (
              <Link href="/dashboard">Dashboard</Link>
            ) : (
              <a onClick={() => setOpen(true)}>Login</a>
            )}
          </li>
        </ul>

        <div className="space-x-3 lg:hidden hover:text-primary cursor-pointer font-semibold">
          {user ? (
            <Link href="/dashboard">Dashboard</Link>
          ) : (
            <a onClick={() => setOpen(true)}>Login</a>
          )}
        </div>
      </div>

      <AuthModal />
    </header>
  )
}
