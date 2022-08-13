import gameContext from '@/contexts/gameContext'
import gameService from '@/services/gameService'
import socketService from '@/services/socketService'
import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { joinRoomIdState } from '@/atoms'
import { useRouter } from 'next/router'

interface RoomProps {
  room: {
    id: string
    time: string
    participants: number
    amount: number,
    password: string
  }
}

const Room = ({ room }: RoomProps) => {
  const router = useRouter()
  const [_, setRoomId] = useRecoilState(joinRoomIdState)
  const [roomName, setRoomName] = useState('')
  const [isJoining, setJoining] = useState(false)

  const { setInRoom, isInRoom } = useContext(gameContext)

  // const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
  //   const value = e.target.value;
  //   setRoomName(value);
  // };

  const joinRoom = async (roomName: string) => {
    console.log(roomName)

    const socket = socketService.socket

    if (!roomName || roomName.trim() === '' || !socket) return

    setJoining(true)

    const joined = await gameService
      .joinGameRoom(socket, roomName)
      .catch((err) => {
        alert(err)
      })

    console.log(joined)

    if (joined) {
      setInRoom(true)
      router.push(`${router.pathname}/${room.id}`)
    }

    setJoining(false)
  }

  return (
    <tr>
      <th>
        <label>{room.id}</label>
      </th>
      <td>{room.time}m</td>
      <td>{room.participants}</td>
      <td>{room.amount}</td>
      {/* <td>{room.isLock && <FontAwesomeIcon size="1x" icon={faLock} />}</td> */}
      <td>
        {room?.password ? (
          <label
            onClick={() => setRoomId(room.id)}
            htmlFor="join-room-modal"
            className="modal-button btn btn-accent w-full px-6"
          >
            Join
          </label>
        ) : (
          <button
            onClick={() => joinRoom(room.id)}
            className="btn btn-accent w-full px-6"
          >
            Join
          </button>
        )}
      </td>
    </tr>
  )
}
export default Room
