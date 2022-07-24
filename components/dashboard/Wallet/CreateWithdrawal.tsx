import axiosClient from '@/api/axios-client'
import Link from 'next/link'
import toast from 'react-hot-toast'
import useSWR from 'swr'

const CreateWithdrawal = () => {
  const { mutate: withdrawalMutate } = useSWR('/wallet/withdrawal')
  const { data: balance, mutate: balanceMuate } = useSWR('/wallet/balance')

  async function handlerSubmitWithdrawl(e: any) {
    e.preventDefault()
    try {
      await axiosClient.post(
        '/wallet/withdrawal',
        {
          amount: +e.target.amount.value,
        }
      )
      toast.success('Tạo lệnh rút thành công')
      withdrawalMutate()
      balanceMuate()
    } catch (e: any) {
      if (e?.code == 'missing-withdrawal-info') toast.error('Vui lòng cập nhật thông tin thanh toán trước khi rút tiền')
      else if (e?.code == 'balance-not-enought') toast.error('Số dư không đủ')
      else toast.error(e.message)
    }
  }

  return (
    <>
      <p className="text-lg">
        Tiền hoa hồng có thể rút:{' '}
        <span className="font-bold">{balance?.commissionBalance}$</span>
      </p>
      <p className="text-lg mt-2">
        Cập nhật thông tin thanh toán để rút tiền <Link href='/user'><button className='font-bold text-accent underline'>tại đây</button></Link>
      </p>
      <form onSubmit={handlerSubmitWithdrawl} className="flex w-full flex-col lg:flex-row gap-4">
        <div className="mt-4 w-full max-w-xs">
          <label className="label">
            <span className="label-text">
              Nhập số tiền muốn rút. Tối thiểu 50$
            </span>
          </label>
          <label className="input-group">
            <input
              type="number"
              name="amount"
              className="input input-bordered input-success w-full"
              defaultValue={balance?.commissionBalance}
              min={50}
              max={balance?.commissionBalance}
              required
            />
            <span>USD</span>
          </label>
        </div>
        <button className="btn btn-accent mt-8 self-end">
          Rút tiền
        </button>
      </form>
    </>
  )
}
export default CreateWithdrawal
