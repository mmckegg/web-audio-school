# Loading Audio Samples

Before we can play anything, we first need to fetch the file from the network. We can do this using good old fashioned [XmlHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data) or use the new [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API):

```js
fetch('http://example.com/sound.ogg').then(function(response) {
  return response.arrayBuffer()
}).then(function(arrayBuffer) {
  // do something clever with the ArrayBuffer
})
```

Then we need to decode the file using [`audioContext.decodeAudioData`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/decodeAudioData) into an [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer). Most browsers support decoding **PCM Wave**, **Ogg Vorbis**, **MP3**, and **AAC** formats.

```js
audioContext.decodeAudioData(arrayBuffer, function(buffer) {
  // returns an AudioBuffer, ready to play!
})
```

# Playing Decoded Audio Buffers

Create an [AudioBufferSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode) using [`audioContext.createBufferSource`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createBufferSource) then set it's [`buffer`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/buffer) property to the decoded `buffer`.

```js
var player = audioContext.createBufferSource()
player.buffer = buffer
```

Now we just connect the node to destination and call `start` as usual! We don't have to call `stop` as in this example, the playback will automatically stop at the end of the audio file.

```js
player.connect(audioContext.destination)
player.start(audioContext.currentTime)
```

# Exercise

> Complete the `play` function so that the decoded sample `buffer` is played at `startTime`.

You can listen to how the audio is supposed to sound by clicking **Play Answer**.