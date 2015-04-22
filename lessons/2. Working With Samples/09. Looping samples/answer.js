//# duration=7.2

var audioContext = new AudioContext()
var startTime = audioContext.currentTime + 0.2

getSample('zara1.ogg', function play(buffer) {
  var player = audioContext.createBufferSource()
  player.buffer = buffer
  player.loop = true
  player.loopStart = 3
  player.loopEnd = 4
  player.connect(audioContext.destination)
  player.start(startTime, 0, 7)
})
  
function getSample(url, cb) {
  fetch(url).then(function(response) {
    return response.arrayBuffer()
  }).then(function(data) {
    audioContext.decodeAudioData(data, cb)
  })
}
