import { IRoomData } from '@/pages/bitcoin/[rid]'
import React from 'react'
import {
  AdvancedRealTimeChart,
  CopyrightStyles,
} from 'react-ts-tradingview-widgets'
import Order from './Order'
interface Props {
  roomData: IRoomData
}

const TradingViewChart = React.memo(({ roomData }: Props) => {
  const chartStyles: CopyrightStyles = {
    parent: {
      display: 'none',
    },
  }

  return (
    <div className="-mt-2.5 lg:mt-0 w-full max-w-screen-lg text-center">
      <div className='lg:p-2 lg:bg-[#181c27] lg:rounded-xl'>
      <div id="chart" className="h-[30vh] lg:h-[60vh] -mx-2 lg:-mx-0">
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
      </div>
      </div>
      <code className="text-xs font-bold lg:text-sm">BTC/USDT</code>
      <Order roomData={roomData} />
    </div>
  )
})

export default TradingViewChart
