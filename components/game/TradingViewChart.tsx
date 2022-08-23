import React from "react"
import { AdvancedRealTimeChart, CopyrightStyles } from "react-ts-tradingview-widgets"

const TradingViewChart = React.memo(props => {
  const chartStyles: CopyrightStyles = {
    parent: {
      display: 'none',
    },
  }

  return (
    <div className="w-full max-w-screen-lg text-center -mt-2 lg:mt-0">
          <div id="chart" className="h-[30vh] rounded-lg lg:h-[60vh]">
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
            <code className="font-bold text-xs lg:text-sm">BTC/USDT</code>
          </div>
        </div>
  )
})

export default TradingViewChart