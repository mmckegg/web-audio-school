var audioContext = new AudioContext()

var shaper = audioContext.createWaveShaper()
shaper.curve = new Float32Array([-1, 1])
shaper.connect(audioContext.destination)

var input = audioContext.createGain()
input.connect(shaper)
input.gain.value = 6

play(0, -24, 2)
play(0, 0, 2)
play(0, 4, 0.5)
play(1, 7, 0.5)
play(1.25, 7+12, 0.25)
play(1.5, 9+12, 0.25)
play(2, -3, 1)
play(2, 12, 0.5)
play(2.5, 7, 0.5)
play(2.75, 9+12, 0.25)
play(3, 7+12, 0.25)

function play(delay, pitch, duration) {
  var startTime = audioContext.currentTime + delay
  var endTime = startTime + duration

  var envelope = audioContext.createGain()
  envelope.connect(input)
  
  envelope.gain.value = 0
  envelope.gain.setTargetAtTime(0.3, startTime, 0.001)
  envelope.gain.setTargetAtTime(0, endTime, 0.1)

  var oscillator = audioContext.createOscillator()
  oscillator.connect(envelope)

  oscillator.type = 'sine'
  oscillator.detune.value = pitch * 100 

  oscillator.start(startTime)
  oscillator.stop(endTime + 2)
}