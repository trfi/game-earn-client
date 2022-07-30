export const Games = () => {
  const games = [
    {
      desc: 'Crypto currency pairs including Bitcoin, Ethereum, and Litecoin',
      image: '/images/game-btc.jpeg',
    },
    {
      desc: 'Precious metal pairs including gold and platium',
      image: '/images/game-gold.png',
    },
    {
      desc: 'Major, minor and exotic currency pairs',
      image: '/images/game-currency.jpg',
    },
  ]
  return (
    <div className="mx-auto flex flex-col lg:flex-row gap-6 max-w-screen-2xl justify-center py-24 lg:py-48 px-4">
      {games.map((game, idx) => (
        <div key={idx} className="border-gray-200 shadow-md hover:border-primary border-2 rounded-xl p-6 max-w-[350px]">
          <div>
            <img className="aspect-video object-cover" src={game.image} alt="game" />
          </div>
          <p className="text-xl mt-3">{game.desc}</p>
        </div>
      ))}
    </div>
  )
}
