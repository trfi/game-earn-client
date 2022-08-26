import { useEffect, useState } from 'react'
import useSWR from 'swr'
import gameService from '@/services/gameService'
import socketService from '@/services/socketService'
import { Tab } from '@headlessui/react'
import axiosClient from '@/api/axios-client'
interface IMessage {
  roomId: string
  username: string
  content: string
}
interface Props {
  roomId: string
  totalReward: number
}

let titles = ['Orders', 'Histories', 'Chat']

const ListOrder = ({ roomId, totalReward }: Props) => {
  const { data: orders, mutate: mutateOrder } = useSWR(
    roomId ? '/orders/' + roomId : null
  )
  const { mutate: mutateBalance } = useSWR('/wallet/balance')
  const [histories, setHistories] = useState<Object[]>([])
  const [messages, setMessages] = useState<IMessage[]>([])

  const handleSendMessage = (e: any) => {
    e.preventDefault()
    const inputMessage = e.target.message
    axiosClient.post('/chat', {
      roomId,
      content: inputMessage.value,
    })
    inputMessage.value = ''
    inputMessage.focus()
  }

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
      gameService.onChatMessage(socketService.socket, (data: IMessage) => {
        console.log(data)
        setMessages((prev) => [...prev, data])
      })
    }
    return () => {
      isMounted = false
      if (socketService.socket) {
        socketService.socket.off('on_new_order')
        socketService.socket.off('on_new_order_history')
        socketService.socket.off('on_chat_message')
      }
    }
  }, [])

  return (
    <div className="relative h-full w-full rounded-xl p-0 shadow-lg lg:min-w-[300px] lg:max-w-[320px] lg:border-t">
      <h2 className="text-md my-1 text-center font-semibold text-yellow-500 lg:my-2 lg:text-lg">
        Total Reward: {totalReward}
      </h2>
      <hr className="mt-1 mb-2 lg:mb-3" />
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
            <Tab.Panel className="scroll max-h-56 w-[calc(100%+6px)] overflow-y-scroll lg:max-h-[calc(100vh-260px)]">
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
            <Tab.Panel className="scroll max-h-56 w-[calc(100%+6px)] overflow-y-scroll lg:max-h-[calc(100vh-260px)]">
              <table className="table-compact table w-full">
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
            <Tab.Panel className="scroll max-h-56 w-[calc(100%+6px)] overflow-y-scroll lg:max-h-[calc(100vh-260px)]">
              <div className="flex h-full flex-col justify-between pt-4 px-4 pb-10">
                <div className='space-y-2 text-sm'>
                  {messages.map((message, idx) => (
                    <div key={idx}>
                      <span className='font-semibold'>{message.username}</span>: {message.content}
                    </div>
                  ))}
                </div>
                <form
                  className="absolute bottom-2 lg:bottom-4 gap-2 bg-white pt-1 flex w-full items-end justify-center left-1/2 transform -translate-x-1/2"
                  onSubmit={handleSendMessage}
                >
                  <input
                    required
                    className="input input-primary input-sm"
                    name="message"
                    type="text"
                    placeholder="Message"
                  />
                  <button className="btn btn-primary btn-sm">Send</button>
                </form>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
export default ListOrder
