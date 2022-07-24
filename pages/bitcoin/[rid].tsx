import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@/models'
import { GameLayout } from '@/components/layouts/Game'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Room: NextPageWithLayout = () => {
  const router = useRouter()
  const { rid } = router.query

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-[18%] space-y-4">
          <Link href="/bitcoin">
            <FontAwesomeIcon
              className="cursor-pointer hover:text-white"
              size="3x"
              icon={faCircleChevronLeft}
            />
          </Link>
          <ul>
            <li>Room {rid}</li>
            <li>Thời gian dự đoán: 3m</li>
            <li>Thời gian còn lại: 30s</li>
            <li>Số tiền tham gia: 100 token</li>
            <li>Số người trong phòng: 5</li>
          </ul>
        </div>
        <div className="w-full max-w-screen-lg">
          <div id="chart">
            <div className="div1">
              <iframe
                src="https://widget.coinlib.io/widget?type=chart&theme=dark&coin_id=859&pref_coin_id=1505"
                width="100%"
                height="536px"
                scrolling="auto"
                marginWidth={0}
                marginHeight={0}
                frameBorder={0}
                // border="0"
              ></iframe>
            </div>
            <div className="div2">Cryptocurrency Prices</div>
          </div>
        </div>
        <div className="w-[18%] border-2 border-primary rounded-xl p-4">
          <h2 className="text-center text-lg font-semibold">
            Tổng giải thưởng
          </h2>
          <hr className="my-3" />
          <div className="">
            <h4 className="text-center font-semibold mb-2">Lệnh đang đặt</h4>
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
      <div className="mt-10 flex justify-center space-x-4">
        <input
          type="text"
          placeholder="Price"
          className="input input-bordered"
        />
        <button className="btn btn-accent">Ready</button>
      </div>
    </div>
  )
}

Room.Layout = GameLayout

export default Room
