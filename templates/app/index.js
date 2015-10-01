var site = module.exports = require('./build/index.js')

if (require.main === module) {
	var config = require('config')
	site.listen(config.port)
	console.log('Listening on port', config.port)
}
