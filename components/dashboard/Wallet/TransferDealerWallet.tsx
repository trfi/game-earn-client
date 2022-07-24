import axiosClient from "@/api/axios-client"
import { useState } from "react"
import toast from "react-hot-toast"
import useSWR from "swr"

const TransferDealerWallet = () => {
  const { mutate: balanceMuate } = useSWR('/wallet/balance')
  const { mutate: dealerHistoryMutate } = useSWR('/history/dealer')
  const [isTranfering, setIsTranfering] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setIsTranfering(true)
    try {
      await axiosClient.post(
        '/wallet/transfer-dealer',
        {
          username: e.target.username.value,
          amount: +e.target.amount.value
        }
      )
      toast.success('Chuyển tiền thành công')
      balanceMuate()
      dealerHistoryMutate()
      setIsTranfering(false)
    } catch (e: any) {
      if (e?.code == 'balance-not-enought') toast.error('Số dư không đủ')
      else toast.error(e.message)
      setIsTranfering(false)
    }
  }

  return (
    <>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <label htmlFor="my-modal-2" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="my-modal-2"
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h3 className="text-xl font-bold mb-6">
              Chuyển tiền từ ví đại lý cho user
            </h3>
            <label className="label">
              <span className="label-text">Chuyển tiền cho user</span>
            </label>
            <input
              name="username"
              placeholder="Nhập username"
              className="input input-primary"
            />
            <label className="label">
              <span className="label-text">Nhập số tiền $</span>
            </label>
            <input
              type="number"
              name="amount"
              defaultValue={0}
              className="input input-primary"
            />
            <button disabled={isTranfering} className="btn btn-primary mt-6">CHUYỂN TIỀN</button>
          </form>
        </label>
      </label>
    </>
  )
}
export default TransferDealerWallet
