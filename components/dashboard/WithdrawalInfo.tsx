import axiosClient from '@/api/axios-client'
import { useAuth } from '@/hooks'
import toast from 'react-hot-toast'

const WithdrawlalInfo = () => {
  const { user, mutate } = useAuth()

  async function handlerWithdrawlalInfo(e: any) {
    e.preventDefault()
    console.log(e.target.payNetwork.value)
    try {
      await axiosClient.patch('/users/withdrawal-info', {
        payAddress: e.target.payAddress.value,
        payNetwork: e.target.payNetwork.value,
      })
      toast.success('Cập nhật thông tin rút tiền thành công')
      mutate()
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <form
      onSubmit={handlerWithdrawlalInfo}
      className="mx-auto flex w-full md:w-1/2 flex-col justify-between rounded-2xl bg-neutral p-8 text-center"
    >
      <div>
        <h3 className="mb-4 text-xl font-semibold">Payment Info</h3>
        <div className="form-control w-full">
          <label className="label mt-2">
            <span className="label-text text-primary-content">Wallet Address</span>
          </label>
          <input
            name="payAddress"
            required
            defaultValue={user?.withdrawalInfo?.payAddress}
            className="input input-bordered input-sm input-primary w-full text-black"
          />
          <label className="label mt-2">
            <span className="label-text text-primary-content">Network</span>
          </label>
          <select
            name="payNetwork"
            defaultValue={user?.withdrawalInfo?.payNetwork}
            className="select select-sm select-primary w-full text-black"
          >
            <option value="BEP20">BEP20</option>
          </select>
        </div>
      </div>
      <button className="btn btn-sm btn-accent mt-8 px-10 mx-auto">Update</button>
    </form>
  )
}
export default WithdrawlalInfo
