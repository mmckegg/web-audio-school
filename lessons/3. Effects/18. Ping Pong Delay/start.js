var audioContext = new AudioContext()

// add effects here


// ^^^^^^^^^^^^^^^^^

play(1/8, 3, 0.05)
play(2/8, 7, 0.05)
play(3/8, 15, 0.05)

function play(startAfter, pitch, duration) {
  var time = audioContext.currentTime + startAfter

  var oscillator = audioContext.createOscillator()
  oscillator.connect(audioContext.destination) // change output

  oscillator.type = 'square'
  oscillator.detune.value = pitch * 100 

  oscillator.start(time)
  oscillator.stop(time + duration)
}