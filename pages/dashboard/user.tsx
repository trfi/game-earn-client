import { DashboardLayout } from "@/components/layouts"
import { NextPageWithLayout } from "@/models"

const User: NextPageWithLayout = () => {
  return (
    <div>User</div>
  )
}

User.Layout = DashboardLayout

export default User