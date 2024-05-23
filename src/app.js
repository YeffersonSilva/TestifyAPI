
const express = require('express')


const pino = require('pino-http')()
const app = express()

app.use(pino)
app.use(express.json())

const router = express.Router()



app.use(router)

module.exports = app