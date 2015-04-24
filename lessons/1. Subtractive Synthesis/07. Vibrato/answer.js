//# duration=4

var audioContext = new AudioContext()

play(0, 3, 0.5)
play(1, 10, 0.5)
play(2, 15, 0.5)

function play(delay, pitch, duration) {
  var startTime = audioContext.currentTime + delay
  var endTime = startTime + duration

  var envelope = audioContext.createGain()
  envelope.connect(audioContext.destination)
  envelope.gain.value = 0
  envelope.gain.setTargetAtTime(1, startTime, 0.1)
  envelope.gain.setTargetAtTime(0, time + duration, 0.2)

  var oscillator = audioContext.createOscillator()
  oscillator.connect(envelope)

  oscillator.type = 'sawtooth'
  oscillator.detune.value = pitch * 100 

  var vibrato = audioContext.createGain()
  vibrato.gain.value = 30
  vibrato.connect(oscillator.detune)

  var lfo = audioContext.createOscillator()
  lfo.frequency.value = 5
  lfo.connect(vibrato)
  lfo.start(startTime)

  oscillator.start(startTime)
  oscillator.stop(endTime + 2)

}