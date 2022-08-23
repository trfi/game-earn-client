import axiosClient from '@/api/axios-client'
import { IRoomData } from '@/pages/bitcoin/[rid]'
import { getServerDate } from '@/utils/serverDate.js'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'

interface Props {
  roomData: IRoomData
}

interface ICreateOrder {
  roomId: string
  price: number
}

const Order = ({ roomData }: Props) => {
  let [serverDate, setServerDate] = useState(0)
  let [isDisableOrder, setIsDisableOrder] = useState(false)
  let [isOrdered, setIsOrdered] = useState(false)
  const { mutate: mutateBalance } = useSWR('/wallet/balance')

  async function handleOrder(e: any) {
    e.preventDefault()
    const price = Number(e.target.price.value)
    order(price).then(() => {
      mutateBalance()
      toast.success('Order Sucess')
      e.target.price.value = ''
    })
  }

  async function order(price: number) {
    setIsOrdered(true)
    const data: ICreateOrder = {
      roomId: roomData.id,
      price,
    }
    try {
      await axiosClient.post('/orders', data)
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    let isMounted = true
    const interval = setInterval(async () => {
      const { offset } = await getServerDate()
      const clientDate = new Date()
      const remainingSecond =
        59 - new Date(clientDate.getTime() + offset).getSeconds()
      setServerDate(remainingSecond)
      if (remainingSecond <= 15) {
        if (!isOrdered) order(0)
        setIsDisableOrder(true)
      } else {
        if (isDisableOrder) setIsOrdered(false)
        setIsDisableOrder(false)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
      isMounted = false
    }
  }, [isOrdered, isDisableOrder])

  return (
    <div className="mt-2 lg:mt-8 flex flex-col items-center justify-center gap-3 lg:flex-row lg:gap-6">
      <div className={`rounded-lg border-2 px-6 py-0 text-lg font-bold lg:py-1.5 lg:text-2xl ${isDisableOrder ? 'border-red-500 text-red-500' : 'border-primary text-primary'}`}>
        00:{String(serverDate).padStart(2, '0')}
      </div>
      <form onSubmit={handleOrder}>
        <input
          type="number"
          min="0"
          placeholder="Price"
          name="price"
          required
          className="input input-bordered input-sm mr-2 lg:input-md"
          disabled={isDisableOrder}
        />
        <button
          disabled={isDisableOrder}
          className="btn btn-accent btn-sm lg:btn-md"
        >
          Ready
        </button>
      </form>
    </div>
  )
}

export default Order
