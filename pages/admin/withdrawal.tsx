import WithdrawalOrder from '@/components/admin/WithdrawalOrder'
import { AdminLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'

const Withdrawl: NextPageWithLayout = () => {
  return <div className="flex w-full overflow-x-auto">
    <WithdrawalOrder />
  </div>
}

Withdrawl.Layout = AdminLayout

export default Withdrawl
