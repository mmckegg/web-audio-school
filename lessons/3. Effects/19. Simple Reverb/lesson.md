> Add the **spring.mp3** impulse response to the guitar to give it a reverb effect

# Simple Reverb

The perception of a sound is heavily depended on the environment that is played in. If you play the guitar in your rehearsal room it will sound differently than when you play it for example in a church. The sound's properties change when it bounces off different materials so that different locations provide unique acoustic experiences.

A location's properties can be captured by recording an audio sample in the desired location and then extracting the difference of it and the original sound. The result of this operation is called an **impulse response** and it can be used to make every sound sound like it was played in that location.

The mathematical concept that is applied to achieve this affect is called **convolution**. In the Web Audio API we can apply convolution effects by leveraging the **ConvolverNode**.

```js
getSample('impulseresponse.mp3'), function(impulse){
  var convolver = audioContext.createConvolver()
  convolver.buffer = impulse

  // myAudioSample is fetched and created before
  myAudioSample.connect(convolver)
  convolver.connect(audioContext.destination)
}
```

As you can see, impulse responses are handled like audio buffers (fetched via XHR and then decoded). The convolution is applied to whichever node that is connected to the convolver. Be aware that convoluting a signal is a pretty calculation-heavy operation and should be used sparsely (esp. on mobile devices).

Luckily you don't need to record impulse responses your own and a huge variety of prerecorded signals can be found all over the internet.
