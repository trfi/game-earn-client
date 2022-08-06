import Head from 'next/head'
import React, { useState, useEffect } from 'react'

const DrawChart = ({ symbol = 'AAPL' }) => {
  const useScript = (url: string) => {
    useEffect(() => {
      const script = document.createElement('script')

      script.src = url
      script.async = true

      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }, [url])
  }

  return (
    <div className="tradingview-widget-container">
      {useScript('https://s3.tradingview.com/tv.js')}
      <div id="tradingview_2d7e4"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/symbols/NASDAQ-AAPL/"
          rel="noopener"
          target="_blank"
        ></a>
      </div>
      <Head>
        <script type="text/javascript">
          {`
            new window.TradingView.widget({
                "width": 400,
                "height": 400,
                "symbol": \`${symbol}\`,
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "allow_symbol_change": true,
                "container_id": "tradingview_2d7e4"
            })
        `}
        </script>
      </Head>
    </div>
  )
}

export default DrawChart
