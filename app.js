const express = require('express')

const router = require('./router')

const bodyParser = require('body-parser')

const app = express()

app.use('/node_module/', express.static('./node_module'))
app.use('/static/', express.static('./static'))
app.use('/common/', express.static('./common'))
app.use('/src/', express.static('./src'))

// for parsing application/json
app.use(bodyParser.json()) 
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) 

app.use('/api', router);

module.exports = app.listen(3000, function (err) {
	if (err) {
		console.log(err)
		return
	}
	console.log('Listening at http://localhost:' + 3000 + '\n')
})
