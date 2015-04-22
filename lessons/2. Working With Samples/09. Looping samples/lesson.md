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

The **offset** and **duration** arguments passed to [`player.start`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start) still have effect. 

If we start the player at `0`, it will continue until it hits `loopEnd` for the first time, then the playback will jump to `loopStart` and continue until the **duration** specified on `start` is reached or [`player.stop`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/stop) is called.

```js
player.start(audioContext.currentTime, offset, duration)
```

# Exercise

> Play the sample from the **beginning** for `4` seconds, then **loop** between `3` seconds and `4` seconds **three** times.

You can listen to how the audio is supposed to sound by clicking **Play Answer**.