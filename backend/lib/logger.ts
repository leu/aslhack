const winston = require('winston');
import { format } from "winston";

export function getTime(timestamp: string) {
    const date = new Date(timestamp)

    var year = date.getFullYear()
    var month = (date.getMonth() + 1).toString().padStart(2, '0')
    var day = date.getDate().toString().padStart(2, '0')

    var hour = date.getHours().toString().padStart(2, '0')
    var minutes = date.getMinutes().toString().padStart(2, '0')
    var seconds = date.getSeconds().toString().padStart(2, '0')
    return `${year}/${month}/${day}/${hour}:${minutes}:${seconds}`
}

export function getNiceTime(timestamp: string) {
  const date = new Date(timestamp)

  var year = date.getFullYear()
  var month = (date.getMonth() + 1).toString().padStart(2, '0')
  var day = date.getDate().toString().padStart(2, '0')

  var hour = date.getHours().toString().padStart(2, '0')
  var minutes = date.getMinutes().toString().padStart(2, '0')
  var seconds = date.getSeconds().toString().padStart(2, '0')
  return `${year}/${month}/${day} - ${hour}:${minutes}:${seconds}`
}

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({ filename: `../logs/${getTime(new Date().toString())}-error.log`, level: 'error' }),
    new winston.transports.File({ filename: `../logs/${getTime(new Date().toString())}-all.log` }),
    new winston.transports.Console({})
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${getNiceTime(timestamp)}] ${level}: ${message}`
    })
  ),
})