var audioContext = new AudioContext()

// add effects here

// ^^^^^^^^^^^^^^^^^

play(0, -3, 0.05)
play(0.05, 2, 0.05)
play(0.1, 9, 0.05)
play(0.15, 14, 0.05)
play(0.2, 9, 0.05)
play(0.25, 2, 0.05)
play(0.3, -3, 0.05)
play(0.35, 7, 0.05)
play(0.4, 14, 0.05)
play(0.45, 18, 0.05)
play(0.5, 9, 0.05)
play(0.55, 2, 0.05)

function play (startAfter, pitch, duration) {
  var time = audioContext.currentTime + startAfter

  var oscillator = audioContext.createOscillator()
  oscillator.connect(audioContext.destination) // change output

  oscillator.type = 'square'
  oscillator.detune.value = pitch * 100

  oscillator.start(time)
  oscillator.stop(time + duration)
}
