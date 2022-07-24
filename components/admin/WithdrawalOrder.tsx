import useSWR from 'swr'

const WithdrawalOrder = () => {
  const { data: withdrawal } = useSWR('/wallet/withdrawal/all')

  const status = {
    0: 'Đợi duyệt',
    1: 'Đợi chuyển tiền',
    2: 'Đã chuyển tiển',
    3: 'Bị từ chối',
  }

  const statusClass = {
    0: 'badge-warning',
    1: 'badge-primary',
    2: 'badge-success',
    3: 'badge-error',
  }
  return (
    <table className="table-zebra bottom-1 table w-full">
      <thead>
        <tr>
          <th>Withdrawl Id</th>
          <th>Số tiền</th>
          <th>Trạng thái</th>
          <th>Actions</th>
          <th>Thời gian</th>
        </tr>
      </thead>
      <tbody>
        {withdrawal?.map(
          (h: {
            _id: string
            amount: number
            status: keyof typeof status
            createdAt: string
          }) => (
            <tr key={h._id}>
              <th className="text-sm">{h._id}</th>
              <td>
                <div className="badge badge-outline badge-lg badge-accent">
                  {h.amount} $
                </div>
              </td>
              <td>
                <div
                  className={`badge p-2.5 uppercase ${statusClass[h.status]}`}
                >
                  {status[h.status]}
                </div>
              </td>
              <td>
                <button className='btn btn-xs'>Duyệt</button>
              </td>
              <td>
                <div className="badge badge-md">
                  {new Date(h.createdAt).toLocaleString()}
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}
export default WithdrawalOrder
