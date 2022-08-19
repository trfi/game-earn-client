import { useEffect, useState } from 'react'
import useSWR from 'swr'
import gameService from '@/services/gameService'
import socketService from '@/services/socketService'
import axiosClient from '@/api/axios-client'

const ListOrder = () => {
  const { data: orders, mutate } = useSWR('/orders')
  // const [orders, setOrders] = useState<any>([])

  // const fetchData = async () => {
  //   try {
  //     const data: any = await axiosClient('/orders')
  //     setOrders(data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const handleNewOrder = () => {
    if (socketService.socket)
      gameService.onNewOrder(socketService.socket, (data) => {
        mutate((prev: any) => [data, ...prev])
      })
  }

  useEffect(() => {
    handleNewOrder()
  }, [])

  return (
    <div className="w-full rounded-xl border-2 border-primary p-2 lg:w-[370px]">
      <h2 className="text-center text-lg font-semibold text-yellow-500">Total Reward 1000</h2>
      <hr className="my-3" />
      <div className="">
        <h4 className="mb-2 text-center font-semibold">Orders</h4>
        <table className="table-compact table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order: any) => (
              <tr key={order?.id}>
                <th>{order?.id}</th>
                <td>
                  {new Date(order?.createdAt).toLocaleString().split(',')[0]}
                </td>
                <td>{order?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default ListOrder
