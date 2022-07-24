import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import JoinRoomModal from './JoinRoomModal'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { joinRoomIdState } from '@/atoms'

const Rooms = () => {
  const router = useRouter()
  const [_, setRoomId] = useRecoilState(joinRoomIdState)

  const rooms = [
    {
      id: '00001',
      time: '5m',
      participants: 5,
      quantity: 50,
      isLock: true,
    },
    {
      id: '00002',
      time: '10m',
      participants: 15,
      quantity: 200,
      isLock: false,
    },
    {
      id: '00003',
      time: '5m',
      participants: 12,
      quantity: 100,
      isLock: false,
    },
    {
      id: '00004',
      time: '15m',
      participants: 3,
      quantity: 500,
      isLock: true,
    },
  ]

  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Time</th>
            <th>Participants</th>
            <th>Quantity</th>
            <th>Lock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <th>
                <label>{room.id}</label>
              </th>
              <td>{room.time}</td>
              <td>{room.participants}</td>
              <td>{room.quantity}</td>
              <td>
                {room.isLock && <FontAwesomeIcon size="1x" icon={faLock} />}
              </td>
              <td>
                {room.isLock ? (
                  <label
                    onClick={() => setRoomId(room.id)}
                    htmlFor="join-room-modal"
                    className="modal-button btn btn-accent w-full px-6"
                  >
                    Join
                  </label>
                ) : (
                  <Link href={`${router.pathname}/${room.id}`}>
                    <button className="btn btn-accent w-full px-6">Join</button>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <JoinRoomModal />
    </div>
  )
}

export default Rooms
