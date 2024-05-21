
const express = require('express')


const pino = require('pino-http')()
const app = express()

app.use(pino)

module.exports = app