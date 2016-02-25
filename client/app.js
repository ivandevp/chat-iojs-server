const Webrtc2Images = require('webrtc2images')
const xhr = require('xhr')

const rtc = new Webrtc2Images({
	width: 200,
	height: 200,
	frames: 10,
	type: 'image/jpeg',
	quality: 0.4,
	interval: 200
})

rtc.startVideo(function(err) {
	if (err) logError(err)
})

const record = document.querySelector('#record')

record.addEventListener('click', function(e) {
	e.preventDefault()

	// grabar video
	rtc.recordVideo(function(err, frames) {
		if (err) logError(err)

		xhr({
			uri: '/process',
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ images: frames })
		}, function (err, res, body) {
			if (err) logError(err)

			console.log(JSON.parse(body))
		})
	})
}, false)

function logError(err) {
	console.error(err)
}