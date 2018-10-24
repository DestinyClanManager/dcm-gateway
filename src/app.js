import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import routes from './routes'
import cors from 'cors'
import Rollbar from 'rollbar'

const { NODE_ENV, ROLLBAR_ACCESS_TOKEN } = process.env

let rollbar
if (NODE_ENV === 'production') {
  rollbar = new Rollbar({
    accessToken: ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true
  })

  rollbar.info('dcm-gateway starting...')
}

const app = express()
app.disable('x-powered-by')

const origins = ['https://admin.unityofguardians.com:8080', 'https://uofgx.cfapps.io', 'https://destinyclanmanager.cfapps.io', 'https://destinyclanmanager.com']

if (process.env.NODE_ENV === 'development') {
  origins.push(undefined)
  console.log('Started in development...')
}

app.use(
  cors({
    origin: function(origin, callback) {
      if (origins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Invalid origin'))
      }
    },
    optionsSuccessStatus: 200
  })
)

app.use(
  logger('dev', {
    skip: () => app.get('env') === 'test'
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  if (NODE_ENV === 'production') {
    rollbar.error(err)
  }

  console.error(err)
  res.status(err.status || 500).send(err.message)
})

export default app
