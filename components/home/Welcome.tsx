import { modalAuthState } from "@/atoms"
import { useAuth } from "@/hooks"
import router from "next/router"
import { useRecoilState } from "recoil"

const Welcome = () => {
  const { user } = useAuth()
  const [_, setOpen] = useRecoilState(modalAuthState)

  return (
    <div className="my-10 flex flex-col lg:flex-row justify-around">
      <div className="flex flex-col justify-center mb-8 lg:mb-0">
        <h1 className="title mb-10 text-center text-5xl lg:text-8xl font-bold">
          GAME FOR EARN 2022
        </h1>
        <button
          onClick={() => (user ? router.push('/play') : setOpen(true))}
          className="z-30 mx-auto rounded-xl border-4 border-yellow-1 px-8 py-1.5 font-airstrike text-2xl leading-10 text-yellow-1 duration-200 ease-in hover:scale-110 lg:px-12 lg:py-2"
        >
          PLAY NOW
        </button>
      </div>
      <div className="mx-4 lg:mx-0">
      <img src="/images/player-position.png" alt="player" />
      </div>
    </div>
  )
}
export default Welcome
