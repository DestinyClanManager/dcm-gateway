import app from './app'
import Rollbar from 'rollbar'

const { PORT = 3000, NODE_ENV, ROLLBAR_ACCESS_TOKEN } = process.env

if (NODE_ENV === 'production') {
  const rollbar = new Rollbar({
    accessToken: ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true
  })

  rollbar.info('dcm-gateway starting...')
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
