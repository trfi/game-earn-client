import axiosClient from '@/api/axios-client'
import { useAuth } from '@/hooks'
import toast from 'react-hot-toast'

const Shareholder = () => {
  const { user, mutate } = useAuth()

  const upgradeShareholder = async () => {
    const data = {
      level: 1,
    }
    try {
      await axiosClient.post('/users/shareholder', data)
      mutate()
      toast.success('Upgrade Shareholder Success')
      mutate
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">SHAREHOLDER PACKAGE</h1>
      {user?.shareholderLevel ? (
        <span className='font-semibold text-xl text-warning'>You are Shareholder level {user.shareholderLevel}</span>
      ) : (
        <button onClick={upgradeShareholder} className="btn btn-primary">
          UPGRAGE LEVEL 1
        </button>
      )}
    </div>
  )
}

export default Shareholder
