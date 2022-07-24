import { DashboardLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import useSWR from 'swr'

const ExchangeHistory: NextPageWithLayout = () => {
  const { data } = useSWR('/history/commission', {
    dedupingInterval: 60 * 1000,
  })

  return (
    <div className="flex w-full overflow-x-auto">
      <table className="table-zebra table w-full bottom-1">
        <thead>
          <tr>
            <th></th>
            <th>Username</th>
            <th>Ref level</th>
            <th>Commission Pay</th>
            <th>Package Price</th>
            <th>Commission Pack</th>
            <th>Commission Percent</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((h: { packPrice: string, commissionPercent: string, commissionPack: string, refLevel: number, commissionPay: string, buyUsername: string, createdAt: string }, idx: number) => (
            <tr key={idx}>
              <th>{idx + 1}</th>
              <td>{h.buyUsername}</td>
              <td><div className='badge badge-primary'>{h.refLevel}</div></td>
              <td><div className='badge badge-lg badge-outline badge-accent'>{h.commissionPay} $</div></td>
              <td><div className='badge badge-outline'>{h.packPrice} $</div></td>
              <td><div className='badge badge-outline'>{h.commissionPack}</div></td>
              <td><div className='badge badge-outline'>{h.commissionPercent}%</div></td>
              <td><div className='badge badge-md'>{new Date(h.createdAt).toLocaleString()}</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

ExchangeHistory.Layout = DashboardLayout

export default ExchangeHistory
