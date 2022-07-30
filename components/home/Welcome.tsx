import { modalAuthState } from '@/atoms'
import { useAuth } from '@/hooks'
import router from 'next/router'
import { useRecoilState } from 'recoil'

export const Welcome = () => {
  const { user } = useAuth()
  const [_, setOpen] = useRecoilState(modalAuthState)

  return (
    <div className="flex lg:h-screen flex-col mt-[80px] lg:mt-0 lg:justify-around lg:flex-row max-w-screen-2xl mx-auto">
      <div className="flex flex-col justify-center mb-8 lg:mb-0 px-4">
        <span className="text-xl font-semibold text-primary">
          Welcome To Play For Earn
        </span>
        <h1 className="title mb-3 text-3xl font-bold lg:text-6xl lg:leading-normal">
          Playground For Entrepreneurs
        </h1>
        <p className='text-md lg:text-lg max-w-xl mb-10'>
          Want to have a place to both entertain and earn money form your super financial knowledge? Let's experience Game For Earn - an entertainment platform that makes money with an initial capital of only 0 USD
        </p>
        <button
          onClick={() => (user ? router.push('/play') : setOpen(true))}
          className="ml-3 self-center lg:self-start w-fit rounded-xl border-4 border-primary px-8 py-1.5 font-airstrike text-2xl leading-10 text-primary duration-200 ease-in hover:scale-110 lg:px-12 lg:py-2"
        >
          PLAY NOW
        </button>
      </div>
      <div className="flex justify-center items-center mx-4 lg:mx-0">
        <img src="/images/player-position2.png" alt="player" />
      </div>
    </div>
  )
}
