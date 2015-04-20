
var Observ = require('observ')
var ObservStruct = require('observ-struct')
var ObservSet = require('../lib/observ-set')
var lessons = require('../lessons')
var Lesson = require('./lesson')
var persist = require('../lib/persist')

var lessonOrder = Object.keys(lessons).reduce(function(result, groupName) {
  Object.keys(lessons[groupName]).forEach(function(name) {
    result.push(groupName + '/' + name)
  })
  return result
}, [])

var state = ObservStruct({
  view: Observ('index'),
  selectedLesson: Observ(lessonOrder[0]),
  verifiedLessons: ObservSet([]),
  lessons: Observ([])
})

persist('selectedLesson', state.selectedLesson)
persist('verifiedLessons', state.verifiedLessons)
persist('view', state.view)

state.audioContext = new AudioContext()

state.lessons.set(Object.keys(lessons).map(function(groupName) {
  return {
    name: groupName,
    lessons: Object.keys(lessons).map(function(name) {
      return {
        title: name,
        path: groupName + '/' + name
      }
    })
  }
}))

state.getLesson = function(path) {
  var parts = path.split('/')
  var data = lessons[parts[0]][parts[1]]
  if (data) {
    return Lesson({
      title: parts[1],
      path: path,
      verifyTime: getDuration(data['answer.js']),
      answer: data['answer.js'],
      lesson: data['lesson.md'],
      start: data['start.js']
    })
  }
}

state.nextLesson = function() {
  var index = lessonOrder.indexOf(state.selectedLesson())
  state.selectedLesson.set(lessonOrder[index+1] || lessonOrder[0])
}

state.prevLesson = function() {
  var index = lessonOrder.indexOf(state.selectedLesson())
  state.selectedLesson.set(lessonOrder[index-1] || lessonOrder[0])
}

function getDuration(src) {
  var match = /\/\/# duration=([0-9\.]+)/.exec(src)
  return match && parseFloat(match[1]) || 2
}

module.exports = state