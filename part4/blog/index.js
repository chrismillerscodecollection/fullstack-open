const { app, connectDB } = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

await connectDB()

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})