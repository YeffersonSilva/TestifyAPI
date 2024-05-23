require('dotenv').config()
const app = require('./app')
const logger = require('pino')()
const users = require('./routes/users')
app.use(express.json())

app.use('/users', users.router)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => { 
  logger.info(`Server is running on port ${PORT}`)
})
