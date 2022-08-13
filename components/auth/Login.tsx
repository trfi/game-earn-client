import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalAuthState } from '@/atoms'
import { useAuth } from '@/hooks'
import Error from './Error'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useRecoilState(modalAuthState)
  const [errors, setErrors] = useState<string[]>([])
  
  useEffect(() => {
    if (!open) setTimeout(() => setErrors([]), 300)
  }, [])

  const { login } = useAuth(
    { middleware: 'guest' },
    {
      revalidateOnMount: false,
    }
  )

  async function handlerLogin(e: any) {
    e.preventDefault()
    setIsLoading(true)
    setErrors([])
    try {
      await login({
        username: e.target.username.value,
        password: e.target.password.value,
      })
      setOpen(false)
    } catch (err: any) {
      setErrors(err && typeof err.message == 'string' ? [err.message] : err.message)
    }
    setIsLoading(false)
  }

  return (
    <>
      <Error errors={errors}></Error>
      <form onSubmit={handlerLogin} className="bg-base-100 px-6 py-8">
        <div className="space-y-4 px-6">
          <input
            name="username"
            type="text"
            required
            autoComplete="username"
            autoFocus
            className="input input-bordered w-full text-center text-base"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            minLength={6}
            required
            autoComplete="current-password"
            className="input input-bordered w-full text-center text-base"
            placeholder="Password"
          />
        </div>

        <div className="mt-6 px-6">
          <button
            type="submit"
            name="btnLogin"
            disabled={isLoading}
            className="btn btn-secondary w-full"
          >
            Login
          </button>
        </div>
      </form>
    </>
  )
}
export default Login
