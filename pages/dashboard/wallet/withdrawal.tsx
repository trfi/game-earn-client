import CreateWithdrawal from '@/components/dashboard/Wallet/CreateWithdrawal'
import WithdrawalHistory from '@/components/dashboard/Wallet/WithdrawalHistory'
import { DashboardLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'

const Withdrawal: NextPageWithLayout = () => {

  return (
    <>
      <div className="mb-10">
        <CreateWithdrawal />
      </div>
      <h1 className='text-xl font-semibold mb-5'>Danh sách lệnh rút tiền</h1>
      <div className="flex w-full overflow-x-auto">
        <WithdrawalHistory />
      </div>
    </>
  )
}

Withdrawal.Layout = DashboardLayout

export default Withdrawal
