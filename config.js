/* eslint-disable no-process-env */
import {toInteger} from 'lodash'


const env = (key, defaultValue) => {
  if (process.env[key] !== undefined) {
    return process.env[key]
  } else if (defaultValue !== undefined) {
    return defaultValue
  } else {
    throw new Error(`Undefined environment variable: ${key}`)
  }
}

const bool = (key, defaultValue = 'false') => {
  const value = env(key, defaultValue)
  if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  } else {
    throw new Error(`Environment variable "${key}" has invalid value: ${value}`)
  }
}

const int = (key, defaultValue) => {
  const value = env(key, defaultValue)
  if (toInteger(value).toString() === value) {
    return toInteger(value)
  } else {
    throw new Error(`Environment variable "${key}" has invalid value: ${value}`)
  }
}

export default {
  devel: bool('devel'),
  server: {
    host: env('host'),
    port: int('port'),
  },
  db: {
    client: 'postgresql',
    connection: env('db_connection'),
  },

}
