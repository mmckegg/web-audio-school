var audioContext = new AudioContext()

// wait 100ms for sample to download/decode
var startTime = audioContext.currentTime + 0.2

getSample('zara1.ogg', function play(buffer) {

})
  
function getSample(url, cb) {
  fetch(url).then(getArrayBuffer).then(function(data) {
    audioContext.decodeAudioData(data, cb)
  })
}

function getArrayBuffer(response) {
  return response.arrayBuffer()
}
