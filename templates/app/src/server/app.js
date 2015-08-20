import CONFIG from 'config'
import express from 'express'

let app = express()

app.all('*', function(req, res) {
	res.end('<%= packageName %> HTTP server')
})

app.listen(CONFIG.port)
console.log('Listening on port', CONFIG.port)
