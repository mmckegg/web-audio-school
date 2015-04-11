var audio = new AudioContext()

var oscillator = audio.createOscillator()
oscillator.connect(audio.destination)

oscillator.type = 'sawtooth'
oscillator.detune.value = 300 // middle C

oscillator.start(audio.currentTime)
oscillator.stop(audio.currentTime + 2)
