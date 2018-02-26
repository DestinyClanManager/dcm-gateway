import app from './app'
import fs from 'fs'
import https from 'https'
import path from 'path'

const { PORT = 3000 } = process.env

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
