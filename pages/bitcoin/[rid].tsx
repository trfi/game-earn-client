import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@/models'
import { GameLayout } from '@/components/layouts/Game'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronLeft
} from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'
import gameService from '@/services/gameService'
import socketService from '@/services/socketService'
import React, { Ref, useContext, useEffect, useRef, useState } from 'react'
import gameContext from '@/contexts/gameContext'
import useSWR from 'swr'
import ListOrder from '@/components/game/RightPanel/ListOrder'
import { useAuth } from '@/hooks'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { Socket } from 'socket.io-client'
import TradingViewChart from '@/components/game/TradingViewChart'
import RoomInfo from '@/components/game/LeftPanel/RoomInfo'
import VictoryNoti, { VictoryNotiHandle } from '@/components/game/VictoryNoti'

export interface IRoomData {
  id: string
  time: number
  amount: number
  maxPlayer: number
}

const Room: NextPageWithLayout = () => {
  const router = useRouter()
  const { rid } = router.query
  const { data: roomData } = useSWR<IRoomData>(rid ? '/rooms/' + rid : null, {
    revalidateOnFocus: false,
  })
  const [isJoining, setJoining] = useState(false)
  const [participants, setParticipants] = useState(1)
  const { setInRoom, isInRoom } = useContext(gameContext)
  const { user } = useAuth()
  const { mutate: mutateBalance } = useSWR('/wallet/balance')
  const [totalReward, setTotalReward] = useState(0)
  const victoryNoti = useRef<VictoryNotiHandle>(null)

  const leaveRoom = async (e: React.FormEvent) => {
    const socket = socketService.socket

    if (!rid || rid === '' || !socket) return

    setJoining(true)

    const leaved = await gameService
      .leaveGameRoom(socket, rid as string)
      .catch((err) => {
        alert(err)
      })

    if (leaved) {
      setInRoom(false)
      router.push('/bitcoin')
    }

    setJoining(false)
  }

  const joinRoom = async () => {
    const socket = socketService.socket

    if (!rid || !user || !socket) return

    setJoining(true)

    const numUser = await gameService
      .joinGameRooms(socket, [rid as string, user.id])
      .catch((err) => {
        alert(err)
      })

    console.log('numUser', numUser, rid)
    console.log('joinedUser', user.username)

    if (numUser) {
      setParticipants(numUser)
    }
    setInRoom(true)

    setJoining(false)

    handleGameResutl(socket)
  }

  const handleGameResutl = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
  ) => {
    gameService.onOrderResult(socket, ({ result, amount }) => {
      console.log('orderResult', result, amount)
      if (result === 1) {
        victoryNoti?.current?.show()
        toast.success(`+${amount} token`, { duration: 3000 })
        mutateBalance()
        const winAmount = amount - (roomData?.amount || 0)
        setTotalReward((preAmount) => preAmount + winAmount)
      } else if (result === 2) {
        setTotalReward((preAmount) => preAmount - amount)
      }
    })
    gameService.onCountUser(socket, (count) => {
      setParticipants(count)
    })
  }

  useEffect(() => {
    joinRoom()
    return () => {
      if (socketService.socket) {
        socketService.socket.off('on_order_result')
      }
    }
  }, [socketService.socket?.connected])

  return (
    <>
      <div className="flex h-full flex-col justify-start gap-5 lg:flex-row lg:justify-between lg:gap-6">
        <div className="relative -mt-1.5 w-full pt-0 lg:mt-0 lg:w-[280px]">
          <div className="absolute right-0 top-1.5 lg:left-0 lg:top-0">
            <FontAwesomeIcon
              onClick={leaveRoom}
              className="cursor-pointer text-2xl lg:text-4xl"
              icon={faCircleChevronLeft}
            />
          </div>
          <RoomInfo roomData={roomData} participants={participants} />
        </div>
        {roomData && (
          <>
            <TradingViewChart roomData={roomData} />
            <ListOrder roomId={roomData.id} totalReward={totalReward} />
          </>
        )}
      </div>

      <VictoryNoti ref={victoryNoti} />
    </>
  )
}

Room.Layout = GameLayout

export default Room
