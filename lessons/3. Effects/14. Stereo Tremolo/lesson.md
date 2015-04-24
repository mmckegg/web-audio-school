> Add a global effect so that the audio output has a `'sine'` shaped **stereo tremolo** (panning between **left** and **right** speakers) at a rate of `2` Hz.

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

# Panning Between Left and Right Speakers

You can use the [StereoPannerNode](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode) to change the amount of sound playing in each speaker. 

Create an instance using [`audioContext.createStereoPanner()`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createStereoPanner).

Use the [`pan`](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode/pan) [AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam) to choose how much sound should play in each speaker. Setting to `0` will play equally in both speakers. `-1` is just the left, and `+1` just the right.
