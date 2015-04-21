module.exports = function(key, obs) {
  var data = get(key)
  if (data != null) {
    obs.set(data)
  }
  return obs(set.bind(this, key))
}

function get(key) {
  var data = localStorage[key]
  if (data != null) {
    return JSON.parse(data)
  }
}

function set(key, value) {
  localStorage[key] = JSON.stringify(value) || 'null'
}