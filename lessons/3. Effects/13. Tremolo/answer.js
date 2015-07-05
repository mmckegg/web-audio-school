// # duration=2.5

var audioContext = new AudioContext()
var tremolo = audioContext.createGain()
tremolo.connect(audioContext.destination)
tremolo.gain.value = 0

var shaper = audioContext.createWaveShaper()
shaper.curve = new Float32Array([0, 1])
shaper.connect(tremolo.gain)

var lfo = audioContext.createOscillator()
lfo.frequency.value = 3
lfo.type = 'sine'
lfo.start(audioContext.currentTime)
lfo.connect(shaper)

play(0, -9, 2.25)
play(0, 3, 2.25)
play(0, 0, 2.25)

function play (delay, pitch, duration) {
  var time = audioContext.currentTime + delay

  var oscillator = audioContext.createOscillator()
  oscillator.connect(tremolo)

  oscillator.type = 'triangle'
  oscillator.detune.value = pitch * 100

  oscillator.start(time)
  oscillator.stop(time + duration)
}
