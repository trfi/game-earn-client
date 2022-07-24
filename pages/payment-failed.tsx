import { useEffect } from 'react'

export default function Example() {

  useEffect(() => {
    setTimeout(() => window.close(), 1000)
  }, [])

  return (
    <div className="text-white p-2">
      <h1>Pay failed</h1>
    </div>
  )
}
