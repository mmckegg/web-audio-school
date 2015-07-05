// adapted from: https://github.com/jsantell/interpolate-color/blob/master/index.js

module.exports = interpolate

function interpolate (start, end, step, precision) {
  precision = precision != null ? precision : 0

  var startH = start[0]
  var startS = start[1]
  var startL = start[2]
  var endH = end[0]
  var endS = end[1]
  var endL = end[2]

  var h = (startH - (startH - endH) * step).toFixed(precision)
  var s = (startS - (startS - endS) * step).toFixed(precision)
  var l = (startL - (startL - endL) * step).toFixed(precision)

  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
}
