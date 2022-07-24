import { DashboardLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import useSWR from 'swr'

const ExchangeHistory: NextPageWithLayout = () => {
  const { data } = useSWR('/history/exchange', {
    dedupingInterval: 60 * 1000,
  })

  return (
    <div className="flex w-full overflow-x-auto">
      <table className="table-zebra table w-full bottom-1">
        <thead>
          <tr>
            <th></th>
            <th>Package Price</th>
            <th>Server</th>
            <th>Character</th>
            <th>Exchange time</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((h: { packPrice: string, character: string, server: string, createdAt: string }, idx: number) => (
            <tr key={idx}>
              <th>{idx + 1}</th>
              <td><div className='badge badge-lg badge-outline badge-accent'>{h.packPrice} $</div></td>
              <td>{h.server}</td>
              <td>{h.character}</td>
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
