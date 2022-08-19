import { getServerDate } from '@/utils/serverDate.js'
import { useEffect, useState } from 'react'

const Countdown = () => {
  let [serverDate, setServerDate] = useState(0)

  useEffect(() => {
    let isMounted = true
    const interval = setInterval(async () => {
      const { offset } = await getServerDate()
      const clientDate = new Date()
      setServerDate(59 - new Date(clientDate.getTime() + offset).getSeconds())
    }, 1000)
    return () => {
      clearInterval(interval)
      isMounted = false
    }
  }, [])

  return <div className="font-bold px-6 py-1 lg:py-1.5 border-2 border-red-500 text-red-500 text-xl lg:text-2xl rounded-lg">00:{String(serverDate).padStart(2, '0')}</div>
}

export default Countdown
