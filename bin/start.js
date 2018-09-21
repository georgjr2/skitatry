import http from 'http'
import {isString} from 'lodash'
import config from '../config'
import app from '../src/backend'

/**
 * Get host and port from environment.
 */
const {host, port} = config.server

/**
 * Create HTTP server.
 */

const server = http.createServer(app.callback())


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, host)

/**
 * Event listener for HTTP server "error" event.
 */

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = isString(port)
    ? `Pipe ${port}`
    : `Port ${port}`

  // Handle specific listen errors with friendly messages
  /* eslint no-process-exit: 0 */
  switch (error.code) {
    case 'EACCES':
      console.log(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
})

/**
 * Event listener for HTTP server "listening" event.
 */

server.on('listening', () => {
  const addr = server.address()
  const bind = isString(addr)
    ? `pipe ${addr}`
    : `port ${addr.port}`
  console.log(`Listening on ${bind}`)
})

