import { walletTypeState } from '@/atoms'
import { useRecoilState } from 'recoil'
import useSWR from 'swr'
import JoinRoomModal from './JoinRoomModal'
import Room from './Room'

const Rooms = () => {
  const [walletType] = useRecoilState(walletTypeState)
  const { data, error, mutate } = useSWR('/rooms?type=' + walletType)

  return (
    <div className="w-full overflow-x-auto">
      <table className="table table-compact lg:table-normal w-full">
        <thead className='text-xs'>
          <tr>
            <th>ID</th>
            <th>Time</th>
            <th>Participants</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((room: any) => (
            <Room key={room.id} room={room} />
          ))}
        </tbody>
      </table>
      <JoinRoomModal />
    </div>
  )
}

export default Rooms
