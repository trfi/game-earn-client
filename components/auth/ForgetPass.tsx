import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalAuthState } from '@/atoms'
import { useAuth } from '@/hooks'
import Error from './Error'
import axiosClient from '@/api/axios-client'
import toast from 'react-hot-toast'

const ForgetPass = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useRecoilState(modalAuthState)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (!open) setTimeout(() => setErrors([]), 300)
  }, [])

  async function handlerLogin(e: any) {
    e.preventDefault()
    setIsLoading(true)
    setErrors([])
    try {
      await axiosClient.post('/auth/reset-password', {
        username: e.target.username.value,
      })
      setOpen(false)
      toast.success('Một email chứa liên kết lấy lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra email', { duration: 10000 })
    } catch (err: any) {
      setErrors(
        err && typeof err.message == 'string' ? [err.message] : err.message
      )
    }
    setIsLoading(false)
  }

  return (
    <>
      <Error errors={errors}></Error>
      <form onSubmit={handlerLogin} className="bg-gray-700 px-6 py-8">
        <div className="flex flex-col space-y-4 px-6">
          <label className="mx-auto font-normal" htmlFor="username">
            Nhập tài khoản muốn lấy lại mật khẩu
          </label>
          <input
            name="username"
            type="text"
            required
            autoComplete="username"
            className="input input-bordered w-full text-center text-base"
            placeholder="Tên tài khoản"
          />
        </div>

        <div className="mt-6 px-6">
          <button
            type="submit"
            name="btnLogin"
            disabled={isLoading}
            className="btn w-full rounded-2xl border border-transparent bg-gray-500 px-4 py-3 text-base font-medium text-white hover:bg-gray-400 disabled:bg-[#cfd088]"
          >
            Quên mật khẩu
          </button>
        </div>
      </form>
    </>
  )
}
export default ForgetPass
