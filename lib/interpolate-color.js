// from: https://github.com/jsantell/interpolate-color/blob/master/index.js

/**
 * A simple color interpolator.
 * Parses a `from` and `to` HSL string in the format
 * `hsl(200, 100%, 50%)` and a step value between 0 and 1
 * and returns a new HSL string.
 * An optional `precision` value may be provided for the
 * new HSL string
 *
 * @param {string} from
 * @param {string} to
 * @param {number} step
 * @param {precision} number
 */

function interpolate (start, end, step, precision) {
  precision = precision != null ? precision : 0;
  var
    startH = start[0],
    startS = start[1],
    startL = start[2],
    endH   = end[0],
    endS   = end[1],
    endL   = end[2];

  var
    h = (startH - (startH - endH) * step).toFixed(precision),
    s = (startS - (startS - endS) * step).toFixed(precision),
    l = (startL - (startL - endL) * step).toFixed(precision);

  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

module.exports = interpolate;