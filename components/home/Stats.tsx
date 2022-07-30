export const Stats = () => {
  return (
    <section id="stats" className="mx-auto flex flex-col lg:flex-row max-w-screen-2xl py-28 lg:py-56 lg:gap-0">
      <div className="w-full lg:w-1/2 mx-auto lg:mx-0 text-center lg:text-left px-4">
        <p className="text-lg font-semibold text-primary">
          GameForEarn In Numbers
        </p>
        <h1 className="title mt-6 text-2xl lg:text-5xl font-bold">
          The Most Innovative And Modern Financial Game Publishing Platform
          Today
        </h1>
        <p className="text-sm lg:text-base mt-6">
          We have a strong community form the start. You will get a surprisingly
          large amount of passive income form referring new people to trading on
          this platform. We always try to create new games to meet your needs
        </p>
      </div>
      <div className="flex items-center lg:items-start justify-center lg:justify-end w-full lg:w-1/2 gap-6 mt-16 lg:mt-0">
        <div className="flex flex-col gap-6">
          <div className="rounded-tl-3xl rounded-br-3xl bg-blue-600 w-32 h-32 lg:w-60 lg:h-60 text-center text-white flex flex-col justify-center">
            <h1 className="mb-3 text-4xl lg:text-6xl font-bold">3+</h1>
            <p>Games launched</p>
          </div>
          <div className="rounded-tl-3xl rounded-br-3xl bg-green-600 w-32 h-32 lg:w-60 lg:h-60 text-center text-white flex flex-col justify-center">
            <h1 className="mb-3 text-4xl lg:text-6xl font-bold">2K</h1>
            <p>Montly active users</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 -mt-10">
          <div className="rounded-tl-3xl rounded-br-3xl bg-red-600 w-32 h-32 lg:w-60 lg:h-60 text-center text-white flex flex-col justify-center">
            <h1 className="mb-3 text-4xl lg:text-6xl font-bold">20M+</h1>
            <p>Hits every month</p>
          </div>
          <div className="rounded-tl-3xl rounded-br-3xl bg-yellow-600 w-32 h-32 lg:w-60 lg:h-60 text-center text-white flex flex-col justify-center">
            <h1 className="mb-3 text-4xl lg:text-6xl font-bold">1+</h1>
            <p>Languages</p>
          </div>
        </div>
      </div>
    </section>
  )
}
