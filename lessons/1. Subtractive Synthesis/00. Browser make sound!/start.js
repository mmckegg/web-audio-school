var audioContext = new AudioContext()

var oscillator = audioContext.createOscillator()
oscillator.connect(audioContext.destination)

oscillator.start(audioContext.currentTime)
oscillator.stop(audioContext.currentTime + 2)
