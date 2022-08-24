import { walletTypeState } from '@/atoms'
import { useRecoilState } from 'recoil'
import useSWR from 'swr'
import JoinRoomModal from './JoinRoomModal'
import Room from './Room'

const Rooms = () => {
  const [walletType] = useRecoilState(walletTypeState)
  const { data } = useSWR('/rooms?type=' + walletType)

  return (
    <>
      <h4 className="mb-3 text-center font-bold lg:mb-6">
        {walletType == 'demo' ? 'Demo Room List' : 'Room List'}
      </h4>
      <div className="w-full overflow-x-auto">
        <table className="table-compact table w-full lg:table-normal">
          <thead className="text-xs">
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
    </>
  )
}

export default Rooms
