import { joinRoomIdState } from '@/atoms'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'

interface Props {
  roomId: string
}

const JoinRoomModal = () => {
  const [roomId] = useRecoilState(joinRoomIdState)
  const router = useRouter()

  function handleSubmit() {}

  return (
    <>
      <input type="checkbox" id="join-room-modal" className="modal-toggle" />
      <label htmlFor="join-room-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="join-room-modal"
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="font-mono text-2xl font-bold">Room {roomId}</h2>
          <hr className="my-6" />
          <h4 className="text-lg font-bold">Enter Room Password</h4>
          <div className="flex items-end">
            <input
              type="number"
              name="amount"
              placeholder="Room Password"
              className="input input-accent mt-4 w-full"
            />
            <Link href={`${router.pathname}/${roomId}`}><button className="btn btn-primary ml-3">ENTER</button></Link>
          </div>
        </label>
      </label>
    </>
  )
}
export default JoinRoomModal
