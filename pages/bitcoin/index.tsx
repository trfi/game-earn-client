import CreateRoomModal from '@/components/game/CreateRoomModal'
import Rooms from '@/components/game/Rooms'
import { GameLayout } from '@/components/layouts/Game'
import { NextPageWithLayout } from '@/models'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const BitcoinGame: NextPageWithLayout = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col justify-center">
      <div className="absolute right-0 lg:left-0 top-0 lg:top-2">
        <Link href="/play">
          <FontAwesomeIcon
            className="cursor-pointer text-3xl lg:text-4xl"
            icon={faCircleChevronLeft}
          />
        </Link>
      </div>
      <h1 className="text-center text-2xl font-bold lg:mt-0 mb-6 lg:mb-12 lg:text-3xl">
        BITCOIN PRICE PREDICTION
      </h1>
      <div className="flex h-full flex-col items-center justify-center">
        {/* <label
          htmlFor="create-room-modal"
          className="modal-button btn btn-primary mb-6"
        >
          Create room
        </label> */}
        <div className="mx-auto w-full max-w-screen-lg rounded-xl border-2 lg:border-4 border-primary p-2 lg:p-6">
          <Rooms />
        </div>
      </div>
      <CreateRoomModal />
    </div>
  )
}

{
  /* {rooms.map((room) => (
  <div className="flex justify-around gap-2 bg-primary p-1" key={room.id}>
    <span>ID: {room.id}</span>
    <span>Time: {room.time}</span>
    <span>Participants: {room.participants}</span>
    <span>Quantity: {room.quantity} token</span>
  </div>
))} */
}

BitcoinGame.Layout = GameLayout

export default BitcoinGame
