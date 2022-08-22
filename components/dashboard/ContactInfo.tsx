import axiosClient from '@/api/axios-client'
import { useAuth } from '@/hooks'
import toast from 'react-hot-toast'

const ContactInfo = () => {
  const { user, mutate } = useAuth()

  async function handlerContactInfo(e: any) {
    e.preventDefault()
    try {
      await axiosClient.patch('/users', {
        email: e.target.email.value,
      })
      toast.success('Cập nhật thông tin liên hệ thành công')
      mutate()
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <form
      onSubmit={handlerContactInfo}
      className="mx-auto flex w-full md:w-1/2 flex-col justify-between rounded-2xl bg-neutral p-8 text-center"
    >
      <div>
        <h3 className="mb-4 text-xl font-semibold">Contact Info</h3>
        <div className="form-control w-full">
          <label className="label mt-2">
            <span className="label-text text-primary-content">Email</span>
          </label>
          <input
            name="email"
            required
            defaultValue={user?.email}
            className="input input-sm input-bordered input-primary w-full text-black"
          />
        </div>
      </div>
      <button className="btn btn-sm btn-accent mt-8 px-10 mx-auto">Update</button>
    </form>
  )
}
export default ContactInfo
