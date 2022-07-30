import { GameLayout } from '@/components/layouts/Game'
import { NextPageWithLayout } from '@/models'
import Link from 'next/link'

const Game: NextPageWithLayout = () => {
  const games = [
    {
      name: 'Bitcoin Price Prediction',
      link: '/game/bitcoin',
    },
    {
      name: 'Gold Price Prediction',
      link: '/game/bitcoin',
    },
    {
      name: 'Stock Price Prediction',
      link: '/game/bitcoin',
    },
  ]
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="flex gap-8">
        {games.map((game, idx) => (
          <Link href={game.link}>
            <div
              className="card w-96 bg-neutral cursor-pointer"
              key={idx}
            >
              <div className="card-body items-center text-center py-16">
                <h2 className="card-title">{game.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

Game.Layout = GameLayout

export default Game
