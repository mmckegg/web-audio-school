// # duration=2.2

var audioContext = new AudioContext()
var startTime = audioContext.currentTime + 0.2

getSample('zara.wav', function play (buffer) {
  var player = audioContext.createBufferSource()
  player.buffer = buffer
  player.connect(audioContext.destination)
  player.start(startTime, 2.5, 2)
})

function getSample (url, cb) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.responseType = 'arraybuffer'
  request.onload = function () {
    audioContext.decodeAudioData(request.response, cb)
  }
  request.send()
}
