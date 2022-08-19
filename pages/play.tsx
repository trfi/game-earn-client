import { GameLayout } from '@/components/layouts/Game'
import { NextPageWithLayout } from '@/models'
import Link from 'next/link'
import toast from 'react-hot-toast'

const Play: NextPageWithLayout = () => {
  const games = [
    {
      name: 'Bitcoin Price Prediction',
      link: '/bitcoin',
    },
    {
      name: 'Gold Price Prediction',
      link: '/#',
      disabled: true,
    },
    {
      name: 'Stock Price Prediction',
      link: '/#',
      disabled: true,
    },
  ]

  const handleClick = () => {
    toast('Comming Soon')
  }

  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="flex flex-col gap-4 py-4 lg:flex-row lg:gap-8">
        <Link href="/bitcoin">
          <div className="card w-64 cursor-pointer border-y-yellow-400 bg-neutral hover:border-y-4 lg:w-96">
            <div className="card-body items-center py-12 text-center lg:py-16">
              <h2 className="card-title">Bitcoin Price Prediction</h2>
            </div>
          </div>
        </Link>
        <div onClick={handleClick} className="card w-64 cursor-pointer border-y-yellow-400 bg-neutral hover:border-y-4 lg:w-96">
          <div className="card-body items-center py-12 text-center lg:py-16">
            <h2 className="card-title">Gold Price Prediction</h2>
          </div>
        </div>
        <div onClick={handleClick} className="card w-64 cursor-pointer border-y-yellow-400 bg-neutral hover:border-y-4 lg:w-96">
          <div className="card-body items-center py-12 text-center lg:py-16">
            <h2 className="card-title">Stock Price Prediction</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

Play.Layout = GameLayout

export default Play
