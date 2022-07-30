import { LayoutProps } from '@/models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import { Auth } from '../common'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks'

export function GameLayout({ children }: LayoutProps) {
  const [mute, setMute] = useState(false)
  const { user } = useAuth()

  function handleVolume() {
    setMute(!mute)
  }

  return (
    <Auth>
      <>
        <div className="min-h-screen">
          <div className="h-26 fixed flex w-full items-center justify-between bg-neutral py-4 px-4 lg:px-8">
            <Link href="/user">
              <div className="relative">
                <div className="avatar placeholder z-10 cursor-pointer">
                  <div className="w-14 lg:w-16 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100 bg-neutral">
                    <span className="text-xl lg:text-4xl font-bold uppercase">
                      {user?.username.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="absolute top-0 left-6 lg:left-12 min-w-[150px] cursor-pointer bg-primary px-8 py-1 text-center text-primary-content font-semibold hover:text-white">
                  {user?.username}
                </div>
                <code className="absolute bottom-0 lg:bottom-2 left-16 lg:left-20 min-w-max font-semibold">
                  500 Token
                </code>
              </div>
            </Link>
            <div className="font-airstrike text-xl hidden lg:block">GameForEarn</div>
            <div className="cursor-pointer text-xl lg:text-3xl" onClick={handleVolume}>
              {mute ? (
                <FontAwesomeIcon icon={faVolumeMute} />
              ) : (
                <FontAwesomeIcon icon={faVolumeUp} />
              )}
            </div>
          </div>
          <div className="h-full pt-[102px]">
            <div className="p-4 lg:p-12">{children}</div>
          </div>
          <div className="fixed bottom-4 flex w-full justify-end gap-4 px-8">
            <button className="btn btn-accent">Mail box</button>
            <button className="btn btn-accent">Support</button>
          </div>
        </div>
      </>
    </Auth>
  )
}
