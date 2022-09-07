import axiosClient from '@/api/axios-client'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const Shareholder = () => {
  const { user, mutate } = useAuth()
  const router = useRouter()
  const byShareholderLevelUp = user?.byShareholder?.shareholderLevel + 1 || 1

  const upgradeShareholder = async () => {
    const data = {
      level: byShareholderLevelUp,
    }
    try {
      await axiosClient.post('/users/shareholder', data)
      mutate()
      toast.success('Upgrade Shareholder Success')
      
    } catch (err: any) {
      toast.error(err.message)
      router.push('/dashboard/wallet')
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">SHAREHOLDER PACKAGE</h1>
      {user?.shareholderLevel ? (
        <span className='font-semibold text-xl text-warning'>You are Shareholder level {user.shareholderLevel}</span>
      ) : (
        <button onClick={upgradeShareholder} className="btn btn-primary">
          UPGRAGE LEVEL {byShareholderLevelUp}
        </button>
      )}
    </div>
  )
}

export default Shareholder
