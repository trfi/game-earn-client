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

  return (
    <tr>
      <td>
        <label className='font-semibold text-xs'>{room.id}</label>
      </td>
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
          <Link href={`${router.pathname}/${room.id}`}>
            <button className="btn btn-sm lg:btn-md btn-accent w-full px-6">Join</button>
          </Link>
        )}
      </td>
    </tr>
  )
}
export default Room
