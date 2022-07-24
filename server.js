const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')

const hostname = 'localhost'
const port = process.env.PORT || 3000
const app = next({ dev: true, hostname, port })
const handle = app.getRequestHandler()

const apiPaths = {
  '/api': {
    target: 'http://localhost:4000',
    pathRewrite: {
      '^/api': '/',
    },
    changeOrigin: true,
  },
}

app
  .prepare()
  .then(() => {
    const server = express()
    server.use('/api', createProxyMiddleware(apiPaths['/api']))

    server.all('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log('Error:::::', err)
  })
