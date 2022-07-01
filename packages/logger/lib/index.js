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
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(convertOptionsToWinstonV3(options))
  ]
})

function convertOptionsToWinstonV3(opts) {
  const newOpts = {};
  const formatArray = [];
  const formatOptions = {
    stringify: () => winston.format((info) => { info.message = JSON.stringify(info.message); })(),
    formatter: () => winston.format((info) => { info.message = opts.formatter(Object.assign(info, opts)); })(),
    json: () => winston.format.json(),
    raw: () => winston.format.json(),
    label: () => winston.format.label(opts.label),
    logstash: () => winston.format.logstash(),
    prettyPrint: () => winston.format.prettyPrint({depth: opts.depth || 2}),
    colorize: () => winston.format.colorize({level: opts.colorize === true || opts.colorize === 'level', all: opts.colorize === 'all', message: opts.colorize === 'message'}),
    timestamp: () => winston.format.timestamp(),
    align: () => winston.format.align(),
    showLevel: () => winston.format((info) => { info.message = info.level + ': ' + info.message; })()
  }
  Object.keys(opts).filter(k => !formatOptions.hasOwnProperty(k)).forEach((k) => { newOpts[k] = opts[k]; });
  Object.keys(opts).filter(k => formatOptions.hasOwnProperty(k) && formatOptions[k]).forEach(k => formatArray.push(formatOptions[k]()));
  newOpts.format = winston.format.combine(...formatArray);
  return newOpts;
}

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
