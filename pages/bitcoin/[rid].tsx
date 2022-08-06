import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@/models'
import { GameLayout } from '@/components/layouts/Game'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { AdvancedRealTimeChart, CopyrightStyles } from 'react-ts-tradingview-widgets'

const Room: NextPageWithLayout = () => {
  const router = useRouter()
  const { rid } = router.query

  function handleSubmit(e: any) {
    e.preventDefault()
    e.target.amount.value = ''
    toast.success('Order sucess')
  }

  const chartStyles: CopyrightStyles = {
    parent: {
      display: 'none',
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div className="w-full space-y-2 lg:w-[18%] lg:space-y-4">
          <Link href="/bitcoin">
            <FontAwesomeIcon
              className="cursor-pointer text-3xl lg:text-5xl"
              icon={faCircleChevronLeft}
            />
          </Link>
          <ul className="text-sm lg:text-base">
            <li>Room {rid}</li>
            <li>Prediction time: 3m</li>
            <li>Remaining time: 30s</li>
            <li>Participation amount: 100 token</li>
            <li>Players: 5/6</li>
          </ul>
        </div>
        <div className="w-full max-w-screen-lg">
          <div id="chart" className="h-[600px]">
            <AdvancedRealTimeChart
              autosize
              hide_side_toolbar
              hide_top_toolbar
              hide_legend
              save_image={false}
              container_id="tradingview_c04cf"
              theme="dark"
              timezone="Asia/Ho_Chi-Minh"
              locale="vi_VN"
              interval="1"
              withdateranges={false}
              allow_symbol_change={false}
              symbol="BINANCE:BTCUSDT"
              copyrightStyles={chartStyles}
            ></AdvancedRealTimeChart>
            {/* <iframe src='https://trading-view.s.gameforearn.com/' width="100%" height={620}></iframe> */}
          </div>
        </div>
        <div className="w-full rounded-xl border-2 border-primary p-4 lg:w-[18%]">
          <h2 className="text-center text-lg font-semibold">Total Reward</h2>
          <hr className="my-3" />
          <div className="">
            <h4 className="mb-2 text-center font-semibold">Orders</h4>
            <table className="table-compact table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Time</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>02333</th>
                  <td>11:15:01</td>
                  <td>20100</td>
                </tr>
                <tr>
                  <th>02334</th>
                  <td>11:15:15</td>
                  <td>50000</td>
                </tr>
                <tr>
                  <th>02335</th>
                  <td>11:15:25</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <th>02337</th>
                  <td>11:15:25</td>
                  <td>1050</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-10 mb-20 flex justify-center space-x-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Price"
            name="amount"
            className="input input-bordered"
          />
          <button className="btn btn-accent">Ready</button>
        </form>
      </div>
    </div>
  )
}

Room.Layout = GameLayout

export default Room
