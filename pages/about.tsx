import { useAuth } from '@/hooks'
import type { NextPage } from 'next'
import Head from 'next/head'

const About: NextPage = () => {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>About - Hiệp Khách</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header onClick={logout} className='flex w-full px-6 mt-3 justify-end items-center space-x-4 font-semibold'>
        <h1>{ user && user.username}</h1>
        <button className='px-4 py-2 bg-yellow-2 font-semibold rounded-lg text-white'>Logout</button>
      </header>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Hiệp Khách
        </h1>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://fb.com/hi.trfi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by W3A
        </a>
      </footer>
    </div>
  )
}

export default About
