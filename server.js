'use strict'

const fs = require('fs')
const http = require('http')
const path = require('path')
const router = require('./router')
const port = process.env.PORT || 8080

const server = http.createServer()

server.on('request', router)
server.on('listening', onListening)

server.listen(port)

function onListening() {
	console.log(`Server listening at ${port}!`)
}
