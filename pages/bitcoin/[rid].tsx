import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@/models'
import { GameLayout } from '@/components/layouts/Game'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
  AdvancedRealTimeChart,
  CopyrightStyles,
} from 'react-ts-tradingview-widgets'
import gameService from '@/services/gameService'
import socketService from '@/services/socketService'
import React, { useContext, useEffect, useState } from 'react'
import gameContext from '@/contexts/gameContext'
import Countdown from '@/components/game/Countdown'
import useSWR from 'swr'
import axiosClient from '@/api/axios-client'
import ListOrder from '@/components/game/ListOrder'
import { useAuth } from '@/hooks'

const Room: NextPageWithLayout = () => {
  const router = useRouter()
  const { rid } = router.query
  const { data: roomData, error, mutate } = useSWR('/rooms/' + rid)
  const [isJoining, setJoining] = useState(false)
  const { setInRoom, isInRoom } = useContext(gameContext)
  const { user } = useAuth()

  async function handleSubmit(e: any) {
    e.preventDefault()
    const data = {
      body: { price: Number(e.target.price.value), amount: roomData.amount },
      userId: user.id,
    }
    if (!socketService.socket) return
    try {
      // await axiosClient.post('/orders', data)
      gameService.newOrder(socketService.socket, data)
      e.target.price.value = ''
      toast.success('Order Sucess')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

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

  const handleGameResutl = () => {
    if (socketService.socket)
      gameService.onOrderResult(socketService.socket, ({result, amount}) => {
        console.log('orderResult', amount);
        if (result === 1)
          toast.success(`WIN +${amount}`)
        else if (result === 2)
          toast.error(`LOSE -${amount}`)
      })
  }

  useEffect(() => {
    handleGameResutl()
  }, [])

  const chartStyles: CopyrightStyles = {
    parent: {
      display: 'none',
    },
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div className="w-full space-y-2 lg:w-[18%] lg:space-y-4">
          <FontAwesomeIcon
            onClick={leaveRoom}
            className="cursor-pointer text-3xl lg:text-5xl"
            icon={faCircleChevronLeft}
          />
          <ul className="text-sm font-semibold lg:text-base">
            <li>Room {rid}</li>
            <li>Prediction time: {roomData?.time}m</li>
            <li>
              Remaining time: <Countdown />
            </li>
            <li>Participation amount: {roomData?.amount} token</li>
            {/* <li>
              Players: {roomData?.participants}/{roomData?.maxPlayer}
            </li> */}
          </ul>
        </div>
        <div className="w-full max-w-screen-lg">
          <div id="chart" className="h-[60vh] rounded-lg">
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
        <ListOrder />
      </div>
      <div className="mt-10 mb-20 flex justify-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Price"
            name="price"
            className="input input-bordered mr-2"
          />
          <button className="btn btn-accent">Ready</button>
        </form>
      </div>
    </div>
  )
}

Room.Layout = GameLayout

export default Room
