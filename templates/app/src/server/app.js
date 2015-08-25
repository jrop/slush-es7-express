import CONFIG from 'config'
import express from 'express'

let app = express()

app.all('*', function(req, res) {
	res.end('<%= packageName %> HTTP server')
})

export default app
