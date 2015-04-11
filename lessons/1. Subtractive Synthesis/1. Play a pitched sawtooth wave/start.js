var audio = new AudioContext()

var oscillator = audio.createOscillator()
oscillator.connect(audio.destination)

oscillator.start(audio.currentTime)
oscillator.stop(audio.currentTime + 2)
