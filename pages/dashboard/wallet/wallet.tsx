import axiosClient from '@/api/axios-client'
import { DashboardLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import getConfig from 'next/config'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import TransferCommissionBalance from '@/components/dashboard/Wallet/TransferCommissionBalance'
import { useAuth } from '@/hooks'
import TransferDealerWallet from '@/components/dashboard/Wallet/TransferDealerWallet'

const Wallet: NextPageWithLayout = () => {
  const [isDeposting, setIsDeposting] = useState(false)
  let toastPaying = ''
  const { user } = useAuth()
  const { data: balance, mutate } = useSWR('/wallet/balance', {
    dedupingInterval: 60 * 1000,
  })

  // const depositHistory = useSWR('/history/deposit')

  // async function handlerSubmitDeposit(e: any) {
  //   e.preventDefault()
  //   try {
  //     const amount = +e.target.amount.value
  //     await axiosClient.post('/wallet/deposit', {
  //       amount
  //     })
  //     toast.success('Nạp thành công');
  //     mutate({ balance: balance.balance + amount })
  //     depositHistory.mutate()
  //   } catch (e: any) {
  //     toast.error(e.message)
  //   }
  // }

  async function checkBalance(invoice_id: number) {
    const i = setInterval(async () => {
      const result: string = await axiosClient.get(
        `/wallet/paymentStatus/${invoice_id}`
      )
      if (result == 'confirming') toast.loading('Confirming', { id: toastPaying })
      else if (result == 'confirmed') {
        clearInterval(i)
        toast.success('Payment success', { id: toastPaying })
        mutate()
        setIsDeposting(false)
      }
    }, 3000)
  }

  async function handlerSubmitDeposit(e: any) {
    e.preventDefault()
    setIsDeposting(true)
    toastPaying = toast.loading('Waiting for payment')
    try {
      const result: { invoice_url: string; id: number } =
        await axiosClient.post('/wallet/invoice', {
          priceAmount: +e.target.amount.value,
          payCurrency: e.target.payCurrency.value,
        })
      // setPayUrl(result.invoice_url)
      // document.getElementById('deposit')?.click()
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
    <div className="flex w-full flex-col space-y-8">
      <h1 className="text-2xl">My wallet</h1>

      <div className="stats stats-vertical bg-primary py-4 text-primary-content lg:stats-horizontal">
        <div className="stat">
          <div className="stat-title">Wallet Balance</div>
          <div className="stat-value mt-3 text-5xl">${balance?.balance}</div>
          <div className="stat-actions mt-8">
            <Link href="/dashboard/deposit-history">
              <button className="btn btn-sm">Deposit History</button>
            </Link>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Commission Balance</div>
          <div className="stat-value mt-3 text-5xl">
            ${balance?.commissionBalance}
          </div>
          <div className="stat-actions mt-8 flex flex-col gap-2 lg:flex-row">
            <Link href="/dashboard/wallet/withdrawal">
              <button className="btn btn-sm">Withdrawal</button>
            </Link>
            <label htmlFor="my-modal-4" className="modal-button btn btn-sm">
              Transfer
            </label>
          </div>
        </div>
        {user?.currentPack >= 500 && (
          <div className="stat">
            <div className="stat-title">Ví đại lý</div>
            <div className="stat-value mt-3 text-5xl">
              ${balance?.dealerBalance}
            </div>
            <div className="stat-actions mt-8 flex flex-col gap-2 lg:flex-row">
              <Link href="/dashboard/wallet/dealer-deposit">
                <button className="btn btn-sm">Nạp tiền</button>
              </Link>
              <label htmlFor="my-modal-2" className="modal-button btn btn-sm">
                Transfer
              </label>
              <Link href="/dashboard/dealer-history">
                <button className="btn btn-sm">Lịch sử</button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handlerSubmitDeposit} className="flex w-full">
        <div className="flex w-full flex-col gap-4 lg:flex-row">
          <div className="w-full max-w-xs">
            <label className="label">
              <span className="label-text">Enter amount. Min 50$</span>
            </label>
            <label className="input-group">
              <input
                type="number"
                name="amount"
                className="input input-bordered input-accent w-full"
                defaultValue={50}
                min={50}
                max={1000000}
                required
              />
              <span>USD</span>
            </label>
          </div>

          <div className="w-full max-w-[15rem]">
            <label className="label">
              <span className="label-text">Select currency</span>
            </label>
            <select
              name="payCurrency"
              defaultValue="usdtbsc"
              className="select select-accent w-full"
            >
              <option value="usdtbsc">USDT BSC</option>
            </select>
          </div>
          <button disabled={isDeposting} className="btn btn-accent mt-8 w-36 self-center">
            Deposit
          </button>
        </div>
      </form>
      <TransferCommissionBalance commissionBalance={balance?.commissionBalance} />
      <TransferDealerWallet />
    </div>
  )
}

Wallet.Layout = DashboardLayout

export default Wallet
