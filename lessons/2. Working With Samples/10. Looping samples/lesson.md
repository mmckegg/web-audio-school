> Play the sample from the **beginning** for `4` seconds, then **loop** between `3` seconds and `4` seconds **three** times.

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

# Setting Loop Points

By default, all [buffer source nodes](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/buffer) play from their **in point** for the **duration** specified then **stop**. 

You can use the [`loop`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loop), [`loopStart`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loopStart), and [`loopEnd`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loopEnd) properties to change this behavior.

First enable looping:

```js
player.loop = true
```

Then mark the loop start and stop points.

```js
player.loopStart = 1
player.loopEnd = 2
```

If we ran the code at this point, the player would **start** at `0`, **continue** until playback hits `loopEnd`, then **jump** to `loopStart`, continuing until it hits `loopEnd`, and so on, **forever**!

The **offset** and **duration** arguments passed to [`player.start`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start) still have effect. We can use `offset` to choose what position to start playing the audio, and `duration` to set a maximum time (instead of looping forever):

```js
player.start(audioContext.currentTime, offset, duration)
```

Or instead of setting a duration, we can schedule a `stop`:

```js
player.start(audioContext.currentTime, offset)
player.stop(audioContext.currentTime + duration)
```

