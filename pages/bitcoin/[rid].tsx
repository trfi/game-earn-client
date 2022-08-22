import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@/models'
import { GameLayout } from '@/components/layouts/Game'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'
import {
  AdvancedRealTimeChart,
  CopyrightStyles,
} from 'react-ts-tradingview-widgets'
import gameService from '@/services/gameService'
import socketService from '@/services/socketService'
import React, { useContext, useEffect, useState } from 'react'
import gameContext from '@/contexts/gameContext'
import useSWR from 'swr'
import ListOrder from '@/components/game/ListOrder'
import { useAuth } from '@/hooks'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { Socket } from 'socket.io-client'
import Order from '@/components/game/Order'

export interface IRoomData {
  id: string
  time: number
  amount: number
  maxPlayer: number
}

const Room: NextPageWithLayout = () => {
  const router = useRouter()
  const { rid } = router.query
  const { data: roomData } = useSWR<IRoomData>(rid ? '/rooms/' + rid : null)
  const [isJoining, setJoining] = useState(false)
  const [participants, setParticipants] = useState(1)
  const { setInRoom, isInRoom } = useContext(gameContext)
  const { mutate: mutateOrders } = useSWR(roomData?.id ? '/orders/' + roomData.id: null)
  const { user } = useAuth()
  const { mutate: mutateBalance } = useSWR('/wallet/balance')

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

  function showResult() {
    const x = document.getElementById('snackbar')
    if (x) {
      x.className = 'show'
      setTimeout(function () {
        x.className = x.className.replace('show', '')
      }, 3000)
    }
  }

  const handleGameResutl = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
  ) => {
    gameService.onOrderResult(socket, ({ result, amount }) => {
      console.log('orderResult', result, amount)
      if (result === 1) {
        mutateBalance()
        toast.success(`WIN +${amount}`, { duration: 3000 })
        showResult()
      }
      mutateOrders()
    })
    gameService.onCountUser(socket, (count) => {
      setParticipants(count)
    })
  }

  useEffect(() => {
    joinRoom()
  }, [rid, user])

  const chartStyles: CopyrightStyles = {
    parent: {
      display: 'none',
    },
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div className="relative w-full space-y-2 px-2 pt-0 lg:w-[370px] lg:space-y-4 lg:pt-2">
          <div className="absolute right-0 top-0 lg:left-0 lg:top-2">
            <FontAwesomeIcon
              onClick={leaveRoom}
              className="cursor-pointer text-3xl lg:text-5xl"
              icon={faCircleChevronLeft}
            />
          </div>
          <div className="grid grid-cols-2 text-sm font-semibold lg:grid-cols-1 lg:pt-10 lg:text-base">
            <span>Room {rid}</span>
            <span>Time: {roomData?.time}m</span>
            <span>Amount: {roomData?.amount} token</span>
            <span>
              Players: {participants}/{roomData?.maxPlayer}
            </span>
          </div>
        </div>
        <div className="w-full max-w-screen-lg">
          <div id="chart" className="h-[30vh] rounded-lg lg:h-[60vh]">
            <AdvancedRealTimeChart
              autosize
              hide_side_toolbar
              hide_top_toolbar
              hide_legend
              save_image={false}
              container_id="tradingview_c04cf"
              theme="dark"
              timezone="Asia/Ho_Chi-Minh"
              locale="vi_VN"
              interval="1"
              withdateranges={false}
              allow_symbol_change={false}
              symbol="BINANCE:BTCUSDT"
              copyrightStyles={chartStyles}
            ></AdvancedRealTimeChart>
          </div>
        </div>
        {roomData && (
          <>
            <Order roomData={roomData} />
            <ListOrder roomId={roomData.id} />
          </>
        )}
      </div>

      <div id="snackbar">
        <img
          className="mx-auto"
          width={300}
          src="/images/victory.webp"
          alt="victory"
        />
      </div>
    </div>
  )
}

Room.Layout = GameLayout

export default Room
