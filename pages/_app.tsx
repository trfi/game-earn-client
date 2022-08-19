import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import { EmptyLayout } from '@/components/layouts'
import { SWRConfig } from 'swr'
import axiosClient from '@/api/axios-client'
import { AppPropsWithLayout } from '../models'
import { Toaster } from 'react-hot-toast'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import socketService from '@/services/socketService'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();
config.autoAddCss = false

library.add(fas)

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout

  const connectSocket = async () => {
    const socket = await socketService
      .connect(publicRuntimeConfig.streamUrl)
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher: (url) => axiosClient.get(url),
          shouldRetryOnError: false,
        }}
      >
        <Layout>
          <Component {...pageProps} />
          <Toaster
            toastOptions={{
              className: '',
              style: {
                background: '#374151',
                color: '#fff',
              },
            }}
          />
        </Layout>
      </SWRConfig>
    </RecoilRoot>
  )
}

export default MyApp
