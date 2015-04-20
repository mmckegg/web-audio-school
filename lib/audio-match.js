module.exports = AudioMatch

function AudioMatch(audioContext){
  var inputA = audioContext.createGain()
  var inputB = audioContext.createGain()

  var analyserA = audioContext.createAnalyser()
  var analyserB = audioContext.createAnalyser()

  analyserA.fftSize = 512
  analyserB.fftSize = 512
  analyserA.smoothingTimeConstant = 0.2
  analyserB.smoothingTimeConstant = 0.2

  inputA.connect(analyserA)
  inputB.connect(analyserB)

  return {
    inputA: inputA,
    inputB: inputB,
    checkMatch: function(){
      var a = new Float32Array(analyserA.frequencyBinCount)
      var b = new Float32Array(analyserB.frequencyBinCount)

      analyserA.getFloatFrequencyData(a)
      analyserB.getFloatFrequencyData(b)

      for (var i=0;i<a.length;i++){
        if (difference(a[i], b[i]) > 20){
          return false
        }
      }

      return true
    }
  }
}

function difference(a, b){
  return Math.abs(a - b)
}