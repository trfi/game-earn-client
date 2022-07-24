import { useRecoilState } from 'recoil'
import { modalAuthState } from '@/atoms'
import AuthModal from '@/components/auth/Modal'
import { useAuth } from '@/hooks'
import Link from 'next/link'

export const Header = () => {
  const [open, setOpen] = useRecoilState(modalAuthState)
  const { user, logout } = useAuth()

  return (
    <header className="mx-auto flex h-16 items-center justify-between pl-3 lg:pl-0 pb-0 lg:items-end lg:pb-3">
      <div className="cursor-pointer font-airstrike text-lg">
        GameForEarn
      </div>
      <ul className="hidden gap-16 md:flex">
        <li className="hover:text-gray-100">
          <a href="/">Home</a>
        </li>
        <li className="hover:text-gray-100">
          <a href="#about">About</a>
        </li>
        <li className="hover:text-gray-100">
          {user ? (
            <Link href="/dashboard">Dashboard</Link>
          ) : (
            <button onClick={() => setOpen(true)}>Login</button>
          )}
        </li>
      </ul>

      <div className="space-x-3 lg:hidden">
        {user ? (
          <Link href="/dashboard">Dashboard</Link>
        ) : (
          <button onClick={() => setOpen(true)}>Login</button>
        )}
      </div>

      <div className="relative mr-8 lg:mr-4 ml-3 flex flex-shrink-0 cursor-pointer lg:mx-10">
        <img src="/images/en.webp" width="30" alt="en" className="z-10" />
        <img
          src="/images/vi.webp"
          width="30"
          alt="vi"
          className="absolute left-3.5"
        />
      </div>
      <AuthModal />
    </header>
  )
}
