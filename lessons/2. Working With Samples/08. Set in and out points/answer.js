//# duration=3.2

var audioContext = new AudioContext()
var startTime = audioContext.currentTime + 0.2

getSample('zara1.ogg', function play(buffer) {
  var player = audioContext.createBufferSource()
  player.buffer = buffer
  player.connect(audioContext.destination)
  player.start(startTime, 2.5, 3)
})
  
function getSample(url, cb) {
  fetch(url).then(function(response) {
    return response.arrayBuffer()
  }).then(function(data) {
    audioContext.decodeAudioData(data, cb)
  })
}
