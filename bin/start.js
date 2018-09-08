import '../loadenv'
import http from 'http'
import path from 'path'
import chokidar from 'chokidar'
import {keys, some, isString} from 'lodash'
import app from '../src/backend'
import config from '../config'


/**
 * Get host and port from environment.
 */
const {host, port} = config.server

/**
 * Create HTTP server.
 */

let currentApp = app.callback()
const server = http.createServer(currentApp)


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


/**
 * Live-reload
 */

const BASE_DIR = path.normalize(path.join(__dirname, '..'))
const COMMON_DIR = path.join(BASE_DIR, 'src', 'common')
const BACKEND_DIR = path.join(BASE_DIR, 'src', 'backend')
const LIB_DIR = path.join(BASE_DIR, 'src', 'lib')
const CONSTANTS_DIR = path.join(BASE_DIR, 'constants')
const watchedPaths = [COMMON_DIR, BACKEND_DIR, LIB_DIR, CONSTANTS_DIR]

if (config.devel) {
  const watcher = chokidar.watch(watchedPaths)
  watcher.on('ready', () => {
    watcher.on('all', () => {
    // eslint-disable-next-line no-console
      console.log('hot replacing server...')
      // eslint-disable-next-line global-require
      keys(require.cache).forEach((key) => {
        if (some(watchedPaths, (path) => key.startsWith(path))) {
          delete require.cache[key]
        }
      })
      const app = require('../src/backend').default.callback()
      server.removeListener('request', currentApp)
      server.on('request', app)
      currentApp = app
    })
  })
}
