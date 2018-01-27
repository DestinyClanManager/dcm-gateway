import app from './app'
import dotenv from 'dotenv'
import fs from 'fs'
import https from 'https'
import path from 'path'

dotenv.config()

const { PORT = 3000 } = process.env

if (process.env.NODE_ENV === 'development') {
  const options = {
    key: fs.readFileSync(path.join(__dirname, '..', '.certs', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', '.certs', 'server.crt')),
    requestCert: false,
    rejectUnauthorized: false
  }
  https.createServer(options, app).listen(PORT, () => console.log(`Listening on ${PORT}`))
} else {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
}
