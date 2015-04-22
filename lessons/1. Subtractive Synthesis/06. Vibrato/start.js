var audioContext = new AudioContext()

play(0, 0, 0.5)
play(1, 7, 0.5)
play(2, 12, 0.5)

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

  oscillator.start(time)
  oscillator.stop(time + duration + 2)
}