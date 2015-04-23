//# duration=4

var audioContext = new AudioContext()

play(0, 3, 0.5)
play(1, 10, 0.5)
play(2, 15, 0.5)

function play(delay, pitch, duration) {
  var time = audioContext.currentTime + delay

  var envelope = audioContext.createGain()
  envelope.connect(audioContext.destination)
  envelope.gain.value = 0
  envelope.gain.setTargetAtTime(1, time, 0.1)
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

  oscillator.start(time)
  oscillator.stop(time + duration + 2)

  lfo.start(time)
  lfo.stop(time + duration + 2)
}