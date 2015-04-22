var audioContext = new AudioContext()
var startTime = audioContext.currentTime + 0.1

getSample('vox.ogg', function play(buffer) {
  var player = audioContext.createBufferSource()
  player.buffer = buffer
  player.connect(audioContext.destination)
  player.start(startTime, 0, buffer.length)
})
  
function getSample(url, cb) {
  fetch(url).then(getArrayBuffer).then(function(data) {
    audioContext.decodeAudioData(data, cb)
  })
}

function getArrayBuffer(response) {
  return response.arrayBuffer()
}
