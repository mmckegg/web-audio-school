
var audioContext = new AudioContext()

var oscillator = audioContext.createOscillator()
oscillator.connect(audioContext.destination)

oscillator.type = 'sawtooth'
oscillator.detune.value = 300 // middle C

oscillator.start(audioContext.currentTime)
oscillator.stop(audioContext.currentTime + 2)
