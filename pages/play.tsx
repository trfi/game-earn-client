import { GameLayout } from '@/components/layouts/Game'
import { NextPageWithLayout } from '@/models'
import Link from 'next/link'

const Play: NextPageWithLayout = () => {
  const games = [
    {
      name: 'Bitcoin Price Prediction',
      link: '/bitcoin',
    },
    {
      name: 'Gold Price Prediction',
      link: '/bitcoin',
    },
    {
      name: 'Stock Price Prediction',
      link: '/bitcoin',
    },
  ]
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 py-4">
        {games.map((game, idx) => (
          <Link key={idx} href={game.link}>
            <div className="card w-64 lg:w-96 cursor-pointer bg-neutral hover:border-y-4 border-y-yellow-400">
              <div className="card-body items-center py-12 lg:py-16 text-center">
                <h2 className="card-title">{game.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

Play.Layout = GameLayout

export default Play
