var Observ = require('observ')

module.exports = ObservSet

function ObservSet(array) {
  var obs = Observ(array || [])

  obs.add = function(key) {
    var data = obs() || []
    if (!~data.indexOf(key)) {
      obs.set(data.concat(key))
    }
  }

  obs.remove = function(key) {
    var data = obs() || []
    if (~data.indexOf(key)) {
      obs.set(data.filter(function(item) {
        return item !== key
      }))
    }
  }

  obs.has = function(key) {
    var data = obs() || []
    return !!~data.indexOf(key)
  }

  return obs
}