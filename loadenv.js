/* eslint-disable no-process-env */
import dotenv from 'dotenv'


dotenv.config({
  path: process.env.envfile || '.env',
  silent: true,
})
