import axiosClient from '@/api/axios-client'
import { IRoomData } from '@/pages/bitcoin/[rid]'
import socketService from '@/services/socketService'
import { getServerDate } from '@/utils/serverDate.js'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'

interface Props {
  roomData: IRoomData
}

const Order = ({ roomData }: Props) => {
  let [serverDate, setServerDate] = useState(0)
  let [isDisableOrder, setIsDisableOrder] = useState(false)
  const { mutate: mutateBalance } = useSWR('/wallet/balance')

  async function handleOrder(e: any) {
    e.preventDefault()
    const data = {
      roomId: roomData.id,
      price: Number(e.target.price.value),
      amount: roomData.amount,
    }
    if (!socketService.socket) return
    try {
      await axiosClient.post('/orders', data)
      e.target.price.value = ''
      mutateBalance()
      toast.success('Order Sucess')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    let isMounted = true
    const interval = setInterval(async () => {
      const { offset } = await getServerDate()
      const clientDate = new Date()
      const remainingSecond = 59 - new Date(clientDate.getTime() + offset).getSeconds()
      setServerDate(remainingSecond)
      if (remainingSecond <= 15) setIsDisableOrder(true)
      else setIsDisableOrder(false)
    }, 1000)
    return () => {
      clearInterval(interval)
      isMounted = false
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-3 lg:absolute lg:bottom-16 lg:left-1/2 lg:-translate-x-1/2 lg:transform lg:flex-row lg:gap-6">
      <div className="rounded-lg border-2 border-red-500 px-6 py-1 text-xl font-bold text-red-500 lg:py-1.5 lg:text-2xl">
        00:{String(serverDate).padStart(2, '0')}
      </div>
      <form onSubmit={handleOrder}>
        <input
          type="number"
          min="0"
          placeholder="Price"
          name="price"
          className="input input-bordered input-sm mr-2 lg:input-md"
          disabled={isDisableOrder}
        />
        <button disabled={isDisableOrder} className="btn btn-accent btn-sm lg:btn-md">Ready</button>
      </form>
    </div>
  )
}

export default Order
