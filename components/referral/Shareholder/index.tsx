import axiosClient from '@/api/axios-client'
import { useAuth } from '@/hooks'
import { formatCurrency } from '@/utils/format'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import useSWR from 'swr'

const Shareholder = () => {
  const { user, mutate } = useAuth()
  const { data: shareholderPackPrice } = useSWR('/config?name=shareholderPackPrice')
  const router = useRouter()
  const byShareholderLevelUp = user?.byShareholder?.shareholderLevel + 1 || 1
  const packPrice = shareholderPackPrice && shareholderPackPrice[byShareholderLevelUp]

  const upgradeShareholder = async () => {
    const data = {
      level: byShareholderLevelUp,
    }
    try {
      await axiosClient.post('/users/shareholder', data)
      mutate()
      toast.success('Upgrade shareholder success')
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
          UPGRAGE LEVEL {byShareholderLevelUp} - {formatCurrency.format(packPrice)}
        </button>
      )}
    </div>
  )
}

export default Shareholder
