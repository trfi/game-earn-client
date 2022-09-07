import { LayoutProps } from '@/models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import { Auth } from '../common'
import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks'
import useSWR from 'swr'
import { useRecoilState } from 'recoil'
import { walletTypeState } from '@/atoms'
import { formatCurrency } from '@/utils/format'

export function GameLayout({ children }: LayoutProps) {
  const [mute, setMute] = useState(false)
  const { user } = useAuth()
  const { data: balance } = useSWR('/wallet/balance')
  const [walletType, setWalletType] = useRecoilState(walletTypeState)

  function handleVolume() {
    setMute(!mute)
  }

  const hanleChangeWalletType = (e: any) => {
    setWalletType(e.target.value)
  }

  return (
    <Auth>
      <>
        <div className="min-h-screen">
          <div className="fixed flex w-full items-center justify-between bg-neutral py-3 px-2 lg:py-3 lg:px-8 lg:text-primary-content z-50">
            {/* Logo */}
            <div className="w-24 cursor-pointer lg:w-36">
              <Link href="/dashboard">
                <img width="150px" src="/logo.png" alt="logo" />
              </Link>
            </div>
            <div className="relative">
              <div className="lg:text-md absolute -bottom-2 right-14 flex min-w-max flex-col gap-1 text-sm font-semibold lg:top-1 lg:right-[4.25rem]">
                <select onChange={hanleChangeWalletType} className="select select-xs text-black">
                  <option value="live">Live Balance</option>
                  <option value="demo">Demo Balance</option>
                </select>
                <code className="ml-2">{formatCurrency.format(walletType == 'live' ? balance?.balance : balance?.demoBalance)}</code>
              </div>
              <Link href="/user">
                <div className="avatar placeholder z-10 cursor-pointer mr-1">
                  <div className="w-10 rounded-full bg-neutral ring ring-primary ring-offset-2 ring-offset-base-100 lg:w-12">
                    <span className="text-xl font-bold uppercase lg:text-3xl">
                      {user?.username?.charAt(0)}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            {/* <div
              className="absolute right-6 cursor-pointer text-xl lg:text-3xl"
              onClick={handleVolume}
            >
              {mute ? (
                <FontAwesomeIcon icon={faVolumeMute} />
              ) : (
                <FontAwesomeIcon icon={faVolumeUp} />
              )}
            </div> */}
          </div>
          <div className="h-screen pt-[65px] lg:pt-[72px]">
            <div className="p-2 md:p-4 lg:py-8 lg:px-4 2xl:p-10 h-full">{children}</div>
          </div>
        </div>
      </>
    </Auth>
  )
}
