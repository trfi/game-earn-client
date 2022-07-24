import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Header } from '../components/home'

const Wiki = () => {
  const [link, setLink] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (router.query.t == 'download-ios')
      setLink(
        'https://drive.google.com/file/d/1VmHoWX0Ybt3qlRZz_87_nobj0dKdU8Cp/preview'
      )
    else
      setLink(
        'https://drive.google.com/file/d/10YhzXbqAV8_8oMpyBAmjSJ78dznKIBYe/preview'
      )
  }, [router])

  const isMobile =
    typeof window !== 'undefined' &&
    window?.matchMedia('only screen and (max-width: 760px)').matches

  const listMenu = [
    {
      link: 'https://drive.google.com/file/d/10YhzXbqAV8_8oMpyBAmjSJ78dznKIBYe/preview',
      title: 'Thông tin nhân vật',
    },
    {
      link: 'https://drive.google.com/file/d/1Rnh7NsXJEF54IkzcI51X8mB2NMFQ9I_v/preview',
      title: 'Vật phẩm mua bằng KNB (vàng)',
    },
    {
      link: 'https://drive.google.com/file/d/1FmBRsSSyl_Moa2-6H6_DVCQGeA0v3oij/preview',
      title: 'Vật phẩm mua bằng bạc',
    },
    {
      link: 'https://drive.google.com/file/d/19riSx7I90Y0xPKOoByrpAq-FwD_JWxDf/preview',
      title: 'Vật phẩm trong game bằng điểm',
    },
    {
      link: 'https://drive.google.com/file/d/1HLf6dgJcNWRIx8UtsdYc5_i1VapUY5_K/preview',
      title: 'Vật phẩm trong game bằng xu',
    },
    {
      link: 'https://drive.google.com/file/d/1t75ZM76EHTg6vwWV9k0cQiQxbWeXlpx5/preview',
      title: 'Vật phẩm vẻ ngoài',
    },
    {
      link: 'https://drive.google.com/file/d/1TuPlcveC7UYE_zAVStQQRSiULrj2JjOo/preview',
      title: 'Hướng dẫn nạp tiền từ Remitano'
    },
    {
      link: 'https://drive.google.com/file/d/1VmHoWX0Ybt3qlRZz_87_nobj0dKdU8Cp/preview',
      title: 'Hướng dẫn tải game trên IOS',
    },
    {
      link: 'https://drive.google.com/file/d/1rDnCw7gwczzjh9uXSgJVWWjBmAtUq5Rx/preview',
      title: 'Hướng dẫn tải game trên Android'
    }
  ]

  function handleClick(link: string) {
    if (isMobile) {
      setTimeout(() => {
        window.open(link, '_blank')
      })
    } else setLink(link)
    // router.replace('/wiki?t=download-ios')
  }

  return (
    <div>
      <Header></Header>
      <main className="flex w-full flex-col justify-around py-10 text-gray-200 lg:flex-row">
        <ul className="list-disc space-y-2 px-6 lg:text-lg">
          {listMenu.map((item, idx) => (
            <li className='hover:text-white' key={idx}>
              <button onClick={() => handleClick(item.link)}>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
        {!isMobile && (
          <embed
            src={link}
            className="mt-10 h-[50vh] w-full max-w-3xl lg:mt-0 lg:h-[80vh]"
          ></embed>
        )}
        {/* <iframe src="https://drive.google.com/file/d/10YhzXbqAV8_8oMpyBAmjSJ78dznKIBYe/preview" width="640" height="480"></iframe> */}
      </main>
    </div>
  )
}

export default Wiki
