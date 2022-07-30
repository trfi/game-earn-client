import Link from 'next/link'
import { useRouter } from 'next/router'
import { LayoutProps } from '@/models'
import { useAuth } from '@/hooks'
import { AuthAdmin } from '../common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export function AdminLayout({ children }: LayoutProps) {
  const router = useRouter()
  const { user, logout } = useAuth()

  const menuItems = [
    {
      href: '/admin',
      title: 'Bảng điều khiển',
    },
    {
      href: '/admin/users',
      title: 'Users',
    },
    {
      href: '/admin/withdrawal',
      title: 'Lệnh rút tiền',
    }
  ]

  return (
    <AuthAdmin>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-start">
          <div className="navbar w-full bg-base-300">
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
          <ul className="menu overflow-y-auto bg-base-300 p-4 text-base-content w-64 lg:w-72">
            <div className="mb-1 flex items-center p-4 font-bold">
              <div className="avatar placeholder online mr-4">
                <div className="w-10 rounded-full bg-neutral-focus">
                  <span className="text-xl uppercase">
                    {user?.username.charAt(0)}
                  </span>
                </div>
              </div>
              <Link href="/user">{user ? user.username : ''}</Link>
            </div>
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
          </ul>
        </div>
      </div>
    </AuthAdmin>
  )
}
