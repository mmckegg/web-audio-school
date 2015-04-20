module.exports = function(target, param) {
  return function send() {
    target(param)
  }
}