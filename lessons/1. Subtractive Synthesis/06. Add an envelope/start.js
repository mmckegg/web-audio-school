var audioContext = new AudioContext()

play(0, 3, 0.5)
play(1, 10, 0.5)
play(2, 15, 0.5)

function play(delay, pitch, duration) {
  var startTime = audioContext.currentTime + delay
  var endTime = startTime + duration
    
  var oscillator = audioContext.createOscillator()
  oscillator.connect(audioContext.destination)

  oscillator.type = 'sawtooth'
  oscillator.detune.value = pitch * 100 

  oscillator.start(startTime)
  oscillator.stop(endTime)
}