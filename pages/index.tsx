import type { NextPage } from 'next'
import Head from 'next/head'
import { Welcome, About, Header, Footer, Stats, Games } from '@/components/home'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { modalAuthState } from '@/atoms'
import { useAuth } from '@/hooks'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.query.ref) document.cookie = `ref=${router.query.ref}`
  }, [router])

  return (
    <div className='mx-auto'>
      <Head>
        <title>Game For Earn</title>
        <meta name="description" content="GAME FOR EARN - PLAY AND EARN 2022" />
        <meta
          name="keywords"
          content="GAME FOR EARN - PLAY AND EARN 2022, MMORPG, RPG"
        />
        <meta name="url" content="https://gameforearn.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="GAME FOR EARN - PLAY AND EARN 2022"
        />
        <meta
          property="og:description"
          content="GAME FOR EARN - PLAY AND EARN 2022"
        />
        <meta property="og:url" content="https://gameforearn.com" />
        <meta property="og:image" content="images/meta.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alata&family=Chakra+Petch:wght@700&family=Playball&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header></Header>
      <main className="pt-6">
        <Welcome />
        <Games />
        <About />
        <Stats />
        <Footer></Footer>
      </main>
    </div>
  )
}

export default Home
