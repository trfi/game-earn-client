import { DashboardLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import useSWR from 'swr'

const DepositHistory: NextPageWithLayout = () => {
  const { data } = useSWR('/history/dealer', {
    revalidateOnFocus: true,
    revalidateOnMount: true
  })

  return (
    <div className="flex w-full overflow-x-auto">
      <table className="table-zebra table w-full bottom-1">
        <thead>
          <tr>
            <th></th>
            <th>Type</th>
            <th>Amount</th>
            <th>Username</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((h: any, idx: number) => (
            <tr key={idx}>
              <th>{idx + 1}</th>
              <td><div className={`badge ${h.type == 1 ? 'badge-primary' : 'badge-warning'}`}>{h.type == 1 ? 'Nạp tiền' : 'Chuyển đi'}</div></td>
              <td><div className='badge badge-lg badge-outline badge-accent'>{h.amount} $</div></td>
              <td><div>{h.username}</div></td>
              <td><div className='badge badge-md'>{new Date(h.createdAt).toLocaleString()}</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

DepositHistory.Layout = DashboardLayout

export default DepositHistory
