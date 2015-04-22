var audioContext = new AudioContext()

play(0, 0, 0.5)
play(1, 7, 0.5)
play(2, 12, 0.5)

function play(delay, pitch, duration) {
  var time = audioContext.currentTime + delay

}