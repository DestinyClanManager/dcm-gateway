import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import routes from './routes'
import cors from 'cors'

const app = express()
app.disable('x-powered-by')

const origins = ['https://admin.unityofguardians.com:8080', 'https://uofgx.cfapps.io']

if (process.env.NODE_ENV === 'development') {
  origins.push(undefined)
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
  res.status(err.status || 500).send(err.message)
})

export default app
