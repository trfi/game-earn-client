import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import { EmptyLayout } from '@/components/layouts'
import { SWRConfig } from 'swr'
import axiosClient from '@/api/axios-client'
import { AppPropsWithLayout } from '../models'
import { Toaster } from 'react-hot-toast'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { fas } from '@fortawesome/free-solid-svg-icons'
config.autoAddCss = false

library.add(fas)

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout

  return (
    <RecoilRoot>
      <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false, dedupingInterval: 60 * 60 * 1000 }}>
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
