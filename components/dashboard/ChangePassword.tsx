import axiosClient from '@/api/axios-client'
import toast from 'react-hot-toast'

const ChangePassword = () => {
  async function handlerChangePassword(e: any) {
    e.preventDefault()
    try {
      await axiosClient.post('/users/change-password', {
        oldPassword: e.target.oldPassword.value,
        newPassword: e.target.newPassword.value,
        confirmNewPassword: e.target.confirmNewPassword.value,
      })
      toast.success('Change password success')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <form
      onSubmit={handlerChangePassword}
      className="mx-auto flex w-full flex-col justify-between rounded-2xl bg-neutral p-8 text-center"
    >
      <h3 className="mb-4 text-xl font-semibold">Đổi Mật Khẩu</h3>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className='w-full'>
          <label className="label mt-2">
            <span className="label-text">Mật khẩu cũ</span>
          </label>
          <input
            name="oldPassword"
            type="password"
            required
            className="input input-sm input-bordered input-primary w-full"
          />
        </div>
        <div className='w-full'>
          <label className="label mt-2">
            <span className="label-text">Mật khẩu mới</span>
          </label>
          <input
            name="newPassword"
            type="password"
            required
            className="input input-sm input-bordered input-primary w-full"
          />
        </div>
        <div className='w-full'>
          <label className="label mt-2">
            <span className="label-text">Nhập lại mật khẩu mới</span>
          </label>
          <input
            name="confirmNewPassword"
            type="password"
            required
            className="input input-sm input-bordered input-primary w-full"
          />
        </div>
      </div>
      <button className="btn btn-sm btn-accent mt-8 px-10 mx-auto">Đổi mật khẩu</button>
    </form>
  )
}
export default ChangePassword
