import axiosClient from '@/api/axios-client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { id, token } = router.query

  async function handleResetPassword(e: any) {
    e.preventDefault()
    setIsLoading(true)
    try {
      await axiosClient.put('/auth/reset-password', {
        userId: id,
        token,
        password: e.target.password.value,
      })
      toast.success('Đổi mật khẩu thành công', { duration: 1500 })
      setTimeout(() => router.push('/'), 1500)
    } catch (err: any) {
      toast.error(err.message)
    }
    setIsLoading(false)
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <form onSubmit={handleResetPassword} className="bg-gray-700 px-6 py-8 rounded-lg">
        <div className="space-y-4 px-6">
          <label htmlFor="password">Nhập mật khẩu mới</label>
          <input
            name="password"
            type="password"
            minLength={6}
            required
            autoComplete="current-password"
            className="input input-bordered w-full text-center text-base"
            placeholder="Mật khẩu"
          />
        </div>

        <div className="mt-6 px-6">
          <button
            type="submit"
            name="btnLogin"
            disabled={isLoading}
            className="btn w-full rounded-2xl border border-transparent bg-gray-500 px-4 py-3 text-base font-medium text-white hover:bg-gray-400 disabled:bg-[#cfd088]"
          >
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  )
}
export default ResetPassword
