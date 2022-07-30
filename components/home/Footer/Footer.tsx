import styles from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faTelegram } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
  return (
    <footer id='contact' className={`${styles.footer} flex h-[50vh] flex-col py-8 px-4`}>
      <div className="mx-auto mt-auto w-full max-w-screen-2xl text-white">
        <div className="mb-4 flex flex-col lg:flex-row items-center justify-between">
          <div className="cursor-pointer font-airstrike text-2xl">
            <a href="/">GameForEarn</a>
          </div>
          <ul className="flex gap-6 font-semibold text-lg">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="mailto:admin@gameforearn.com">Contact</a>
            </li>
          </ul>
        </div>
        <hr />
        <div className="mt-6 flex flex-col-reverse items-center lg:flex-row justify-between">
          <a href='mailto:admin@gameforearn.com' className="text-center text-md lg:text-lg">
            Email: admin@gameforearn.com
          </a>
          <p className="text-center text-md lg:text-lg mt-4 lg:mt-0">
            Copyright © 2022{' '}
            <a className="text-primary" href="/">
              GameForEarn
            </a>
          </p>
          <div className='flex gap-4'>
            <a href='/' className='border rounded-full w-10 h-10 flex items-center justify-center opacity-60 cursor-pointer'>
              <FontAwesomeIcon size='lg' icon={faFacebookF} />
            </a>
            <a href='/' className='border rounded-full w-10 h-10 flex items-center justify-center opacity-60 cursor-pointer'>
              <FontAwesomeIcon size='lg' icon={faTwitter} />
            </a>
            <a href='/' className='border rounded-full w-10 h-10 flex items-center justify-center opacity-60 cursor-pointer'>
              <FontAwesomeIcon size='lg' icon={faTelegram} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
