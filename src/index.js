import app from './app'
import Rollbar from 'rollbar'

const { PORT = 3000, NODE_ENV, ROLLBAR_ACCESS_TOKEN } = process.env

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
