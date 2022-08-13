import { getServerDate } from '@/utils/serverDate.js'
import { useEffect, useState } from 'react'

const Countdown = () => {
  let [serverDate, setServerDate] = useState(0)

  useEffect(() => {
    let isMounted = true
    const interval = setInterval(async () => {
      const { offset } = await getServerDate()
      const clientDate = new Date()
      setServerDate(60 - new Date(clientDate.getTime() + offset).getSeconds())
    }, 1000)
    return () => {
      clearInterval(interval)
      isMounted = false
    }
  }, [])

  return <span className="font-semibold">{String(serverDate)}s</span>
}
export default Countdown
