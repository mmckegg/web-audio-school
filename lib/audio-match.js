module.exports = AudioMatch

function AudioMatch (audioContext) {
  var inputA = audioContext.createChannelSplitter(2)
  var inputB = audioContext.createChannelSplitter(2)

  var analyserA = null
  var analyserB = null

  setupAnalysers()

  return {
    inputA: inputA,
    inputB: inputB,

    reset: setupAnalysers,

    checkMatch: function () {
      var a = new Float32Array(analyserA.frequencyBinCount)
      var b = new Float32Array(analyserB.frequencyBinCount)

      analyserA.getFloatFrequencyData(a)
      analyserB.getFloatFrequencyData(b)

      for (var i = 0;i < a.length;i++) {
        if (difference(a[i], b[i]) > 20) {
          return false
        }
      }

      return true
    },

    checkSignal: function () {
      var a = new Uint8Array(analyserA.frequencyBinCount)
      var b = new Uint8Array(analyserB.frequencyBinCount)

      analyserA.getByteFrequencyData(a)
      analyserB.getByteFrequencyData(b)

      for (var i = 0;i < a.length;i++) {
        if (a[i] > 25 || b[i] > 25) {
          return true
        }
      }

      return false
    }
  }

  function setupAnalysers () {
    inputA.disconnect()
    inputB.disconnect()

    analyserA = audioContext.createAnalyser()
    analyserB = audioContext.createAnalyser()

    analyserA.fftSize = 512
    analyserB.fftSize = 512
    analyserA.smoothingTimeConstant = 0.3
    analyserB.smoothingTimeConstant = 0.3

    inputA.connect(analyserA)
    inputB.connect(analyserB)
  }
}

function difference (a, b) {
  return Math.abs(a - b)
}
