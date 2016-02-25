const course = require('course')
const jsonBody = require('body/json')
const path = require('path')
const st = require('st')

const router = course()

const mount = st({
	path: path.join(__dirname, '..', 'public'),
	index: 'index.html',
	passthrough: true
})

router.post('/process', function(request, response) {
	jsonBody(request, response, { limit: 3 * 1024 * 1024 }, function(err, body) {
		if(err) fail(err, response)

		console.log(body)

		response.setHeader('Content-Type', 'application/json')
		response.end(JSON.stringify({ 'ok': true }))
	})
})

function onRequest(request, response) {
	mount(request, response, function(err) {
		if(err) fail(err, response)

		router(request, response, function(err) {
			if(err) fail(err, response)

			response.statusCode = 404
			response.end(`Not found ${request.url}`)
		})
	})
}

function fail(err, response) {
	response.statusCode = 500
	response.setHeader('Content-type', 'text/plain')
	response.end(err.message)
}

module.exports = onRequest