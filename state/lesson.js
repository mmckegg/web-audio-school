var Observ = require('observ')
var ObservStruct = require('observ-struct')

module.exports = Lesson

function Lesson(descriptor) {

  var obs = ObservStruct({
    title: Observ(descriptor.title),
    path: Observ(descriptor.path),
    verifyTime: Observ(descriptor.verifyTime),
    lesson: Observ(descriptor.lesson),
    answer: Observ(descriptor.answer),
    file: Observ(descriptor.start),
    modified: Observ(false)
  })

  obs.reset = function() {
    obs.file.set(descriptor.start)
  }

  if (localStorage['lessons/' + descriptor.path]) {
    obs.modified.set(true)
    obs.file.set(localStorage['lessons/' + descriptor.path])
  }

  obs.file(function(data) {
    if (data === descriptor.start) {
      obs.modified() && obs.modified.set(false)
      delete localStorage['lessons/' + descriptor.path]
    } else {
      !obs.modified() && obs.modified.set(true)
      localStorage['lessons/' + descriptor.path] = data
    }
  })

  return obs
}