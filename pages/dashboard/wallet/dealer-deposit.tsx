import axiosClient from '@/api/axios-client'
import { DashboardLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'

const DealerDeposit: NextPageWithLayout = () => {
  const { data: knbPackages } = useSWRImmutable('/game/knbpack')
  const { user, mutate: mutateUser } = useAuth()
  const { data: dealerDepositPack } = useSWRImmutable('/game/dealerDepositPack')
  const [isDeposting, setIsDeposting] = useState(false)
  const router = useRouter()

  let toastPaying = ''

  const discount = knbPackages && knbPackages[user.currentPack]?.dealerDiscount.percent

  const dealerHistory = useSWR('/history/dealer')
  const userBalance = useSWR('/wallet/balance')

  async function checkBalance(invoice_id: number) {
    const i = setInterval(async () => {
      const result: string = await axiosClient.get(
        `/wallet/paymentStatus/${invoice_id}`
      )
      if (result == 'confirming') toast.loading('Confirming', { id: toastPaying })
      else if (result == 'confirmed') {
        clearInterval(i)
        toast.success('Payment success', { id: toastPaying })
        setIsDeposting(false)
        router.push('/dashboard/wallet')
        userBalance.mutate()
        dealerHistory.mutate()
      }
    }, 3000)
  }

  async function handlerSubmitDeposit(e: any, pack: number) {
    e.preventDefault()
    setIsDeposting(true)
    toastPaying = toast.loading('Waiting for payment')
    try {
      const result: { invoice_url: string; id: number } =
        await axiosClient.post('/wallet/invoice', {
          priceAmount: +pack,
          payCurrency: 'USDTBSC',
          isDealerWallet: true
        })
      setTimeout(() => {
        window.open(result.invoice_url, '_blank')
      })
      checkBalance(result.id)
    } catch (e: any) {
      toast.error(e.message)
      toast.dismiss(toastPaying)
      setIsDeposting(false)
    }
  }

  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold">NẠP TIỀN VÀO VÍ ĐẠI LÝ</h1>
      </div>

      <div className="mx-auto mt-[8vh] grid grid-cols-1 gap-6 md:grid-cols-2 xl:max-w-6xl">
        {dealerDepositPack?.map((pack: number) => (
          <div className="card bg-neutral text-slate-100 shadow-xl" key={pack}>
            <div className="card-body">
              <h3 className="card-title text-4xl font-bold">
                ${pack.toLocaleString()}
              </h3>
              <div className="card-actions items-end justify-between">
                <code className="w-full text-md text-red-300 lg:w-[70%]">
                  Được chiết khấu {user.currentPack == 2000 && pack >= 10000 ? 10 : discount}%
                </code>
                <button
                  disabled={isDeposting}
                  onClick={(e) => handlerSubmitDeposit(e, pack)}
                  className="btn btn-primary disabled:bg-gray-700"
                >
                  Nạp Ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

DealerDeposit.Layout = DashboardLayout

export default DealerDeposit
