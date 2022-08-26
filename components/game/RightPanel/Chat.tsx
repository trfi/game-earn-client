import { useAuth } from '@/hooks'
import gameService from '@/services/gameService'
import socketService from '@/services/socketService'
import { useEffect, useState } from 'react'

export interface IMessage {
  roomId: string
  username: string
  content: string
}

interface Props {
  roomId: string
}

const Chat = ({ roomId }: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const { user } = useAuth()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (socketService.socket) {
      console.log(e.target.message.value)
      gameService.sendMessage(socketService.socket, {
        roomId,
        username: user.username,
        content: e.target.message.value,
      })
    }
  }

  useEffect(() => {
    let isMounted = true
    if (socketService.socket) {
      gameService.onChatMessage(socketService.socket, (data: IMessage) => {
        console.log(data)
        setMessages((prev) => [data, ...prev])
      })
    }
    return () => {
      isMounted = false
      if (socketService.socket) {
        socketService.socket.off('on_new_message')
      }
    }
  }, [socketService.socket])

  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div>
        {messages.map((message, idx) => (
          <div key={idx}>
            {message.username} {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="input input-primary input-sm"
          name="message"
          type="text"
          placeholder="Message"
        />
        <button className="btn btn-primary btn-sm">Send</button>
      </form>
    </div>
  )
}

export default Chat
