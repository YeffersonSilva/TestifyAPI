require('dotenv').config()
const express = require('express')

const pino = require('pino-http')
const logger = require('pino')()
const app = express()

app.use(pino)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})
