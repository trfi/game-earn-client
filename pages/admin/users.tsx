import ListUser from '@/components/admin/Users'
import { AdminLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'

const Users: NextPageWithLayout = () => {
  return (
    <div className="flex w-full overflow-x-auto">
      <ListUser />
    </div>
  )
}

Users.Layout = AdminLayout

export default Users
