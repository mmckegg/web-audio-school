var audioContext = new AudioContext()

// add effects here

// ^^^^^^^^^^^^^^^^^

play(0, -7, 2.25)
play(0, 5, 2.25)
play(0, 0, 2.25)

function play (delay, pitch, duration) {
  var time = audioContext.currentTime + delay

  var oscillator = audioContext.createOscillator()
  oscillator.connect(audioContext.destination) // change output

  oscillator.type = 'triangle'
  oscillator.detune.value = pitch * 100

  oscillator.start(time)
  oscillator.stop(time + duration)
}
