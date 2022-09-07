import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faCoins,
  faDoorOpen,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { IRoomData } from '@/pages/bitcoin/[rid]'
import { formatCurrency } from '@/utils/format'

interface Props {
  roomData: IRoomData | undefined
  participants: number
}

const RoomInfo = ({ roomData, participants }: Props) => {
  return (
    <div className="pt-2 lg:pt-14">
      <div className="grid grid-cols-2 text-sm font-semibold lg:grid-cols-1 lg:gap-2.5 lg:text-base">
        <div className="flex items-center gap-1 lg:gap-2">
          <FontAwesomeIcon width={22} icon={faDoorOpen} />
          <span>Room: {roomData?.id}</span>
        </div>
        <div className="flex items-center gap-1 lg:gap-2">
          <FontAwesomeIcon width={22} icon={faClock} />
          <span>Time: {roomData?.time}m</span>
        </div>
        <div className="flex items-center gap-1 lg:gap-2">
          <FontAwesomeIcon width={22} icon={faCoins} />
          <span> Amount: {formatCurrency.format(roomData?.amount || 0)}</span>
        </div>
        <div className="flex items-center gap-1 lg:gap-2">
          <FontAwesomeIcon width={22} icon={faUserGroup} />
          <span>
            Players: {participants}/{roomData?.maxPlayer}
          </span>
        </div>
      </div>
    </div>
  )
}

export default RoomInfo
