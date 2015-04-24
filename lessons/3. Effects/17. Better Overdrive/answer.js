//# duration=4.5

var audioContext = new AudioContext()

var highCut = audioContext.createBiquadFilter()
highCut.type = 'lowpass'
highCut.frequency.value = 5000
highCut.connect(audioContext.destination)

var shaper = audioContext.createWaveShaper()
shaper.curve = generateCurve(22050)
shaper.connect(highCut)

var input = audioContext.createGain()
input.connect(shaper)
input.gain.value = 6

play(0, -24, 2)
play(0, 0, 2)
play(0, 4, 0.5)
play(1, 7, 0.5)
play(1.25, 7+12, 0.25)
play(1.5, 9+12, 0.25)
play(2, -3, 1)
play(2, 12, 0.5)
play(2.5, 7, 0.5)
play(2.75, 9+12, 0.25)
play(3, 7+12, 0.25)


function play(delay, pitch, duration) {
  var startTime = audioContext.currentTime + delay
  var endTime = startTime + duration

  var envelope = audioContext.createGain()
  envelope.connect(input)
  
  envelope.gain.value = 0
  envelope.gain.setTargetAtTime(0.3, startTime, 0.001)
  envelope.gain.setTargetAtTime(0, endTime, 0.1)

  var oscillator = audioContext.createOscillator()
  oscillator.connect(envelope)

  oscillator.type = 'sine'
  oscillator.detune.value = pitch * 100 

  oscillator.start(startTime)
  oscillator.stop(endTime + 2)
}

function generateCurve(steps){
  var curve = new Float32Array(steps)
  var deg = Math.PI / 180

  for (var i=0;i<steps;i++) {
    var x = i * 2 / steps - 1
    curve[i] = (3 + 10) * x * 20 * deg / (Math.PI + 10 * Math.abs(x))
  }

  return curve
}