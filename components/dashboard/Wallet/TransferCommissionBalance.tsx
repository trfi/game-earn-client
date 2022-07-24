import axiosClient from "@/api/axios-client"
import toast from "react-hot-toast"
import useSWR from "swr"

const TransferCommissionBalance = (props: { commissionBalance: number }) => {
  const { mutate: balanceMuate } = useSWR('/wallet/balance')
  const { mutate: dealerHistoryMutate } = useSWR('/history/dealer')

  async function handleSubmit(e: any) {
    e.preventDefault()
    try {
      await axiosClient.post(
        '/wallet/transfer-commission',
        {
          amount: +e.target.amount.value,
        }
      )
      toast.success('Chuyển sang tài khoản chính thành công')
      balanceMuate()
      dealerHistoryMutate()
    } catch (e: any) {
      if (e?.code == 'balance-not-enought') toast.error('Số dư không đủ')
      else toast.error(e.message)
    }
  }

  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="my-modal-4"
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-bold">
              Nhập số tiền muốn chuyển sang tài khoản chính
            </h3>
            <input
              type="number"
              name="amount"
              defaultValue={props.commissionBalance}
              max={props.commissionBalance}
              className="input input-accent mt-4"
            />
            <button className="btn btn-primary ml-3">CHUYỂN</button>
          </form>
        </label>
      </label>
    </>
  )
}
export default TransferCommissionBalance
