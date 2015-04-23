> Complete the `play()` function on the right so that the sequence is played correctly. 

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

# Scheduling Events

Like we saw in the previous example, we need to specify the `start` and `stop` time of each generator node. This is specified relative to `audioContext.currentTime` which is time in seconds since the `AudioContext` was first created.

Play a sound 3 seconds after `AudioContext` created and stop after 1 second:

```js
play(3, 1)

function play(at, duration) {
  var oscillator = audioContext.createOscillator()
  oscillator.connect(audioContext.destination)
  oscillator.start(at)
  oscillator.stop(at+duration)
}
```

But since we don't know how long the audio context has existed for, it's better to always schedule relative to the current time:

```js
play(3, 1)

function play(delay, duration) {
  var oscillator = audioContext.createOscillator()
  oscillator.connect(audioContext.destination)

  // add audioContext.currentTime
  oscillator.start(audioContext.currentTime + delay)
  oscillator.stop(audioContext.currentTime + delay + duration)
}
```