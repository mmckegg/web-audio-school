var audioContext = new AudioContext()

play(0, 3, 0.5)
play(1, 10, 0.5)
play(2, 15, 0.5)

function play(delay, pitch, duration) {
  var time = audioContext.currentTime + delay

  var filter = audioContext.createBiquadFilter()
  filter.connect(audioContext.destination)
  filter.type = 'highpass'
  filter.frequency.value = 10000

  var oscillator = audioContext.createOscillator()
  oscillator.connect(filter)

  oscillator.type = 'sawtooth'
  oscillator.detune.value = pitch * 100 

  oscillator.start(time)
  oscillator.stop(time + duration)
}