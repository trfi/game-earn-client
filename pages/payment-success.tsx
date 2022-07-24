import { useEffect } from 'react'

export default function Example() {

  useEffect(() => {
    window.close()
  }, [])

  return (
    <div className="text-white p-2">
      <h1>Pay success</h1>
    </div>
  )
}
