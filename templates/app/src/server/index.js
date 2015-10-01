import api from './api'
import apiify from 'apiify'
import CONFIG from 'config'
import express from 'express'
import path from 'path'

let app = express()
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', apiify(api))
app.all('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))

export default app
