



const pino = require('pino-http')()


app.use(pino)
app.use(express.json())

const router = express.Router()



app.use(router)

module.exports = app