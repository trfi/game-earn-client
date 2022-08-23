import { useEffect, useState } from 'react'
import useSWR from 'swr'
import gameService from '@/services/gameService'
import socketService from '@/services/socketService'
import { Tab } from '@headlessui/react'
import Histories from './Histories'

interface Props {
  roomId: string
  totalReward: number
}

const ListOrder = ({ roomId, totalReward }: Props) => {
  const { data: orders, mutate } = useSWR(roomId ? '/orders/' + roomId : null)
  const [histories, setHistories] = useState<Object[]>([])
  let titles = ['Orders', 'Histories']

  const handleNewOrder = () => {
    if (socketService.socket) {
      gameService.onNewOrder(socketService.socket, (data) => {
        mutate((prev: any) => [data, ...prev])
      })
      gameService.onNewOrderHistory(socketService.socket, (data) => {
        console.log('onNewOrderHistory', data)
        setHistories((prev) => [data, ...prev])
      })
    }
  }

  useEffect(() => {
    handleNewOrder()
  }, [])

  return (
    <div className="h-full w-full rounded-xl border-2 border-primary p-2 lg:w-[370px]">
      <h2 className="text-center text-md lg:text-lg font-semibold text-yellow-500">
        Total Reward {totalReward}
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
                  {orders?.map((order: any) => (
                    <tr key={order?._id}>
                      <td className="text-xs font-semibold">
                        {order?.user.substring(0, 8)}
                      </td>
                      <td>
                        {
                          new Date(order?.createdAt)
                            .toLocaleString()
                            .split(',')[0]
                        }
                      </td>
                      <td>{order?.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab.Panel>
            <Tab.Panel>
              <table className="table-compact table w-full scroll">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Result</th>
                    <th>Reward</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="max-h-48 overflow-y-auto">
                  {histories?.map(
                    (h: any) =>
                      h && (
                        <tr key={h.time}>
                          <td>
                            <div className='text-xs'>{new Date(h.time).toLocaleString().split(',')[0]}</div>
                          </td>
                          <td><div className='badge badge-primary badge-sm'>{h.resultPrice}</div></td>
                          <td><div className='badge badge-warning badge-sm'>{h.amount > 0 ? '+' + h.amount : h.amount}</div></td>
                          <td className="text-right">
                            {
                              <div
                                className={`badge ${
                                  h.result == 1
                                    ? 'badge-accent'
                                    : h.result == 2
                                    ? 'badge-error'
                                    : ''
                                }`}
                              >
                                {h.result == 1
                                  ? 'Victory'
                                  : h.result == 2
                                  ? 'Lose'
                                  : '---'}
                              </div>
                            }
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
