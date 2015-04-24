//# duration=4.5

var audioContext = new AudioContext()

var input = audioContext.createGain()
var merger = audioContext.createChannelMerger(2)
var output = audioContext.createGain()

var leftDelay = audioContext.createDelay()
var rightDelay = audioContext.createDelay()
var feedback = audioContext.createGain()

input.connect(feedback, 0)
leftDelay.connect(rightDelay)
rightDelay.connect(feedback)
feedback.connect(leftDelay)
merger.connect(output)
input.connect(output)
output.connect(audioContext.destination)

feedback.gain.value = 0.4

leftDelay.connect(merger, 0, 0)
rightDelay.connect(merger, 0, 1)

leftDelay.delayTime.value = 3/8
rightDelay.delayTime.value = 3/8

play(1/8, 3, 0.05)
play(2/8, 7, 0.05)
play(3/8, 15, 0.05)

function play(startAfter, pitch, duration) {
  var time = audioContext.currentTime + startAfter

  var oscillator = audioContext.createOscillator()
  oscillator.connect(input)

  oscillator.type = 'square'
  oscillator.detune.value = pitch * 100 

  oscillator.start(time)
  oscillator.stop(time + duration)
}