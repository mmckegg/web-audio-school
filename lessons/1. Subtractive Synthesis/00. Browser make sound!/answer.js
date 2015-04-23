//# duration=2

var audioContext = new AudioContext()

var oscillator = audioContext.createOscillator()
oscillator.connect(audioContext.destination)

oscillator.type = 'sawtooth'

oscillator.start(audioContext.currentTime)
oscillator.stop(audioContext.currentTime + 2)
