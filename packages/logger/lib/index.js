'use strict';

const winston = require('winston')

const { env } = process

const options = { colorize: 'all' }
if (process.env.LOG_LEVEL !== undefined) {
  if (process.env.LOG_LEVEL === 'none') options.silent = true
  else options.level = process.env.LOG_LEVEL
}

winston.addColors({
  info: 'cyan',
  error: 'red',
  warn: 'yellow'
})
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console(options)
  ]
})

const format = (o) => {
  if (o && o.sql) {
    return `${o}\nSQL:\n${o.sql}`
  }
  return o
}
const create = ({ name, sensitive }) => {
  if (!name) throw new Error('Missing name')

  const fn = (...a) => {
    if (sensitive && env === 'production') return
    logger.info(name, ...a.map(format))
  }

  fn.error = (...a) => logger.error(name, ...a.map(format))
  fn.warn = (...a) => logger.warn(name, ...a.map(format))
  return fn
}

module.exports = create
