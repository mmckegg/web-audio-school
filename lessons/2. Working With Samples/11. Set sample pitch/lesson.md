> Change the sample **pitch** down `1` octave (halve the speed).

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

# Audio Playback Rate

You can change the speed the audio plays back (and therefore it's pitch) using the [`playbackRate`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/playbackRate) [AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam).


This will play audio back at **twice** it's original speed and pitch (an octave up):

```js
player.playbackRate.value = 2
```

If we want to slow the audio down (reduce pitch), we specify a decimal:

```js
// play at 80% the original speed
player.playbackRate.value = 0.8
```
