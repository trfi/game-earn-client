import Link from 'next/link'
import { useRouter } from 'next/router'
import { LayoutProps } from '@/models'
import { useAuth } from '@/hooks'
import { Auth } from '../common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export function DashboardLayout({ children }: LayoutProps) {
  const router = useRouter()
  const { user, logout } = useAuth()

  const menuItems = [
    {
      href: '/dashboard',
      title: 'Dashboard',
    },
    {
      href: '/dashboard/referral',
      title: 'Referral Program',
    },
    {
      href: '/dashboard/wallet',
      title: 'My wallet',
    },
    {
      href: '/dashboard/commission-history',
      title: 'Commission History',
    },
    {
      href: '/dashboard/deposit-history',
      title: 'Deposit History',
    },
    {
      href: '/dashboard/exchange-history',
      title: 'Commissoin Exchange',
    },
  ]

  return (
    <Auth>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-start">
          <div className="navbar w-full bg-neutral">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-2" className="btn btn-ghost btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2 font-airstrike font-bold text-slate-400"></div>
            <div className="flex-none">
              <ul className="menu menu-horizontal">
                <li>
                  <button onClick={logout} className="rounded-xl p-3 text-xl">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-5 md:p-8 lg:p-16">{children}</div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu w-64 overflow-y-auto bg-neutral p-4 text-base-content lg:w-72">
            <Link href="/user">
              <div className="mb-1 flex cursor-pointer items-center p-4 font-bold">
                <div className="avatar placeholder online mr-4">
                  <div className="w-10 rounded-full bg-neutral-focus hover:text-white">
                    <span className="text-xl uppercase">
                      {user?.username?.charAt(0)}
                    </span>
                  </div>
                </div>
                <p className="hover:text-white">{user ? user.username : ''}</p>
              </div>
            </Link>
            {menuItems.map(({ href, title }) => (
              <li className="my-[3px]" key={title}>
                <Link href={href}>
                  <a
                    className={`flex cursor-pointer hover:bg-gray-500 ${
                      router.asPath === href && 'bg-gray-700 text-white'
                    }`}
                  >
                    {title}
                  </a>
                </Link>
              </li>
            ))}
            <li className="my-[3px]" key="play">
              <Link href="/play">
                <a className={`flex cursor-pointer hover:bg-gray-500`}>
                  Play Game
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Auth>
  )
}
