> Complete the `play` function so that **each sample** in the sequence is played at the correct **pitch**.

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

# Chromatic Pitching of Audio Samples

[`playbackRate`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/playbackRate) works well enough for simple speed changes, but if we want to set precise audio pitches, we'll have to do some math. 

Unfortunately, [AudioBufferSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode) doesn't have a `detune` option like the [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/detune) does.

Audio pitch is slightly tricky to calculate because the **frequency/speed _doubles_ every octave you go up**.

Setting the `playbackRate` to `2` would go **up one octave**, or **+12 semitones**. 

If you wanted to transpose **up 7 semitones**, you would do the following:

```js
player.playbackRate.value = Math.pow(2, 7 / 12) // 1.50...
```

Or **+24 semitones** (+2 octaves):

```js
player.playbackRate.value = Math.pow(2, 24 / 12) // 4...
```

This works going down as well. Here we transpose **down 14 semitones**:

```js
player.playbackRate.value = Math.pow(2, -14 / 12) // 0.45...
```
