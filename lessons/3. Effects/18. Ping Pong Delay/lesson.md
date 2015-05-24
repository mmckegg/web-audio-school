> Add a global **stereo ping pong delay** effect, bouncing **left to right**, a delay **time** of `3/8` and **feedback** ratio of `0.4`.

# Ping pong?

Ping pong delay is much like standard delay, except that each time the sound feeds back, it swaps channels. So it sounds like the echo is bouncing backwards and forwards (left and right).

Making **stereo ping pong delay** is very similar to a standard mono one, except we'll need two instances of **DelayNode** and a special kind of AudioNode called the **ChannelMergerNode**.

Let's create an `input` and `output` **GainNode** that we'll hang everything else off:

```js
var input = audioContext.createGain()
var output = audioContext.createGain()

oscillator.connect(input)
output.connect(audioContext.destination)
```

We want to hear our audio as it is being played, as well as the delayed sound, so let's connect the `input` to the `output`.

```js
input.connect(output)
```

Now let's create our left and right **DelayNode** instances:

```js
var leftDelay = audioContext.createDelay()
var rightDelay = audioContext.createDelay()

leftDelay.delayTime.value = delayTime
rightDelay.delayTime.value = delayTime
```

Any sound that comes out of the `leftDelay` should be sent to the `rightDelay`.

```js
leftDelay.connect(rightDelay)
```

Any sound that comes out of `rightDelay` should go back into the loop. Let's create a feedback **GainNode**, and connect it to the delay nodes.

```js
var feedback = audioContext.createGain()
feedback.connect(leftDelay)
rightDelay.connect(feedback)
feedback.gain.value = feedbackRatio
```

Now let's connect up to our `input` to the feedback loop:

```js
input.connect(feedback)
```

And finally merge the two mono audio signals into a signal stereo signal using the [ChannelMergerNode](https://developer.mozilla.org/en-US/docs/Web/API/ChannelMergerNode) and connect to `output`.

```js
var merger = audioContext.createChannelMerger(2)
leftDelay.connect(merger, 0, 0)
rightDelay.connect(merger, 0, 1)
merger.connect(output)
```
