export const Footer = () => {
  return (
    <footer className="flex justify-center flex-col lg:flex-row lg:justify-center pt-5 lg:pt-10 px-2 lg:px-28">
      <div className="flex flex-col justify-end pb-10 items-center">
        <ul className="lg:hidden flex w-full justify-around my-5">
          <li className='hover:text-gray-300'>
            <a href="/wiki">Tutorial</a>
          </li>
          <li className='hover:text-gray-300'>
            <a href="#news">News</a>
          </li>
        </ul>
        <h2 className="pb-5 lg:pb-8 text-center text-2xl text-yellow-1">Support</h2>
        <div className="flex gap-4">
          <a className="w-[37px] lg:w-[55px] mr-[3px]" href="https://youtube.com/channel/UCEM5uaZJz3bWqPV-fFhE3lQ" target="_blank">
            <img width="60" src="/images/youtube.svg" alt="Youtube" />
          </a>
          <a className="w-[40px] lg:w-[60px]" href="https://t.me/gameforearn" target="_blank">
            <img width="60" src="/images/telegram.svg" alt="Telegram" />
          </a>
          <a className="w-[40px] lg:w-[60px]" href="https://www.facebook.com/Hi%E1%BB%87p-Kh%C3%A1ch-Tranh-H%C3%B9ng-104107655666693" target="_blank">
            <img width="60" src="/images/facebook.svg" alt="Facebook" />
          </a>
        </div>
        <p className="whitespace-pre text-center mt-6 text-sm lg:text-base">
          Email: admin@gameforearn.com
        </p>
      </div>
    </footer>
  )
}
