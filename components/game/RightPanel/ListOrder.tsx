import { useEffect, useState } from 'react'
import useSWR from 'swr'
import gameService from '@/services/gameService'
import socketService from '@/services/socketService'
import { Tab } from '@headlessui/react'

interface Props {
  roomId: string
  totalReward: number
}

const ListOrder = ({ roomId, totalReward }: Props) => {
  const { data: orders, mutate: mutateOrder } = useSWR(roomId ? '/orders/' + roomId : null)
  // const [orders, setOrders] = useState<Object[]>([])
  const { mutate: mutateBalance } = useSWR('/wallet/balance')
  const [histories, setHistories] = useState<Object[]>([])
  let titles = ['Orders', 'Histories']

  useEffect(() => {
    let isMounted = true
    if (socketService.socket) {
      gameService.onNewOrder(socketService.socket, (data) => {
        mutateOrder((prev: any) => [data, ...prev])
      })
      gameService.onNewOrderHistory(socketService.socket, (data) => {
        setHistories((prev) => [data, ...prev])
        if (data.one) {
          mutateOrder()
          mutateBalance()
        }
      })
    }
    return () => {
      isMounted = false
      // if (socketService.socket) {
      //   socketService.socket.off('on_new_order')
      //   socketService.socket.off('on_new_order_history')
      // }
    }
  }, [socketService.socket])

  return (
    <div className="h-full w-full rounded-xl p-0 shadow-xl lg:min-w-[300px] lg:max-w-[320px]">
      <h2 className="text-md text-center font-semibold text-yellow-500 lg:text-lg">
        Total Reward: {totalReward}
      </h2>
      <hr className="mt-1 mb-2 lg:my-3" />
      <div>
        <Tab.Group>
          <Tab.List className="tabs justify-center">
            {titles.map((title) => (
              <Tab
                key={title}
                className={({ selected }) =>
                  selected ? 'tab tab-active tab-lifted' : 'tab tab-lifted'
                }
              >
                {title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <table className="table-compact table w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Time</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map(
                    (order: any) =>
                      order && (
                        <tr key={order._id}>
                          <td className="text-xs font-semibold">
                            {order?.user.substring(0, 8)}
                          </td>
                          <td>
                            <div className="badge badge-sm">
                              {
                                new Date(order.createdAt)
                                  .toLocaleString()
                                  .split(',')[0]
                              }
                            </div>
                          </td>
                          <td>
                            <div className="badge badge-sm badge-primary">
                              {order.price}
                            </div>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </Tab.Panel>
            <Tab.Panel className="max-h-56 w-[calc(100%+8px)] overflow-y-auto pr-[8px] lg:max-h-[calc(100vh-250px)]">
              <table className="table-compact box-border table w-full">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Predict</th>
                    <th>Result</th>
                    <th>Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {histories?.map(
                    (h: any) =>
                      h && (
                        <tr key={h.id}>
                          <td>
                            <div className="text-xs">
                              {new Date(h.time)
                                .toLocaleString()
                                .split(',')[0]
                                .slice(0, -3)}
                            </div>
                          </td>
                          <td>
                            <div className="badge badge-sm badge-primary">
                              {h.price == 0 ? '--' : h.price}
                            </div>
                          </td>
                          <td>
                            <div className="badge badge-sm badge-primary">
                              {h.resultPrice}
                            </div>
                          </td>
                          <td>
                            <div
                              className={`badge badge-sm ${
                                h.result == 1
                                  ? 'badge-accent'
                                  : h.result == 2
                                  ? 'badge-error'
                                  : 'badge-warning'
                              }`}
                            >
                              {h.amount == 0
                                ? '--'
                                : h.amount > 0
                                ? '+' + h.amount
                                : h.amount}
                            </div>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
export default ListOrder
