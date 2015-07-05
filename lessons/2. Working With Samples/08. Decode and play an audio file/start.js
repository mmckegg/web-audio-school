var audioContext = new AudioContext()

// wait 100ms for sample to download/decode
var startTime = audioContext.currentTime + 0.2

getSample('zara1.ogg', function play (buffer) {})

function getSample (url, cb) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.responseType = 'arraybuffer'
  request.onload = function () {
    audioContext.decodeAudioData(request.response, cb)
  }
  request.send()
}
