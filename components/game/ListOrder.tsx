import { useEffect, useState } from 'react'
import useSWR from 'swr'
import gameService from '@/services/gameService'
import socketService from '@/services/socketService'
import axiosClient from '@/api/axios-client'

const ListOrder = () => {
  const { data: orders, mutate } = useSWR('/orders', {
    refreshInterval: 1000
  })
  // const [orders, setOrders] = useState<any>([])

  // const fetchData = async () => {
  //   try {
  //     const data: any = await axiosClient('/orders')
  //     setOrders(data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const handleGameWin = () => {
  //   if (socketService.socket)
  //     gameService.onNewOrder(socketService.socket, ({ roomId, data }) => {
  //       console.log(orders);
  //       mutate((prev: any) => [data, ...prev])
  //     })
  // }

  // useEffect(() => {
  //   handleGameWin()
  // }, [])

  return (
    <div className="w-full rounded-xl border-2 border-primary p-4 lg:w-[18%]">
      <h2 className="text-center text-lg font-semibold">Total Reward</h2>
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
              <tr key={order.id}>
                <th>{order.id}</th>
                <td>
                  {new Date(order.createdAt).toLocaleString().split(',')[0]}
                </td>
                <td>{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default ListOrder
