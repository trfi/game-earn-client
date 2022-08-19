import { LayoutProps } from '@/models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import { Auth } from '../common'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks'
import useSWR from 'swr'

export function GameLayout({ children }: LayoutProps) {
  const [mute, setMute] = useState(false)
  const { user } = useAuth()
  const { data: balance } = useSWR('/wallet/balance')

  function handleVolume() {
    setMute(!mute)
  }

  return (
    <Auth>
      <>
        <div className="min-h-screen">
          <div className="h-26 fixed flex w-full items-center justify-between border-b bg-white py-8 lg:py-4 px-4 lg:border-b-0 lg:bg-neutral lg:px-8 lg:text-primary-content">
            <Link href="/user">
              <div className="absolute top-20 lg:relative lg:top-0">
                <div className="avatar placeholder z-10 cursor-pointer">
                  <div className="w-10 rounded-full bg-neutral ring ring-primary ring-offset-2 ring-offset-base-100 lg:w-16">
                    <span className="text-xl font-bold uppercase lg:text-4xl">
                      {user?.username?.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="lg:text-md absolute top-0 left-6 min-w-[150px] cursor-pointer bg-primary px-8 py-0.5 text-center text-sm font-semibold text-primary-content hover:text-white lg:left-12 lg:py-1">
                  {user?.username}
                </div>
                <code className="lg:text-md absolute -bottom-1 left-12 min-w-max text-sm font-semibold lg:bottom-2 lg:left-20">
                  {balance?.balance} token
                </code>
              </div>
            </Link>
            {/* Logo */}
            <div className="absolute left-1/2 w-36 -translate-x-1/2 transform cursor-pointer">
              <Link href="/play">
                <img width="150px" src="/logo.png" alt="logo" />
              </Link>
            </div>
            <div
              className="cursor-pointer text-xl lg:text-3xl absolute right-6"
              onClick={handleVolume}
            >
              {mute ? (
                <FontAwesomeIcon icon={faVolumeMute} />
              ) : (
                <FontAwesomeIcon icon={faVolumeUp} />
              )}
            </div>
          </div>
          <div className="h-full pt-[102px]">
            <div className="p-4 2xl:p-10">{children}</div>
          </div>
          {/* <div className="fixed bottom-4 flex w-full justify-end gap-4 px-8">
            <button className="btn btn-accent">Mail box</button>
            <button className="btn btn-accent">Support</button>
          </div> */}
        </div>
      </>
    </Auth>
  )
}
