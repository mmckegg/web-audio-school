//# duration=3

var audioContext = new AudioContext()

play(0, 0, 0.5)
play(1, 7, 0.5)
play(2, 12, 0.5)

function play(delay, pitch, duration) {
  var oscillator = audioContext.createOscillator()
  oscillator.connect(audioContext.destination)

  oscillator.type = 'sawtooth'
  oscillator.detune.value = pitch * 100 

  oscillator.start(audioContext.currentTime+delay)
  oscillator.stop(audioContext.currentTime+delay+duration)
}