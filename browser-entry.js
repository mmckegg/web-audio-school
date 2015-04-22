var insertCss = require('insert-css')
var watch = require('observ/watch')

var css = require('./styles')
insertCss(css)

var state = require('./state')
var LessonView = require('./views/lesson')
var IndexView = require('./views/index')

var lastElement = null
var lastView = null
var lastLesson = null

watch(state, function refreshView() {
  if (state.view() === 'lesson') {
    if (lastLesson !== state.selectedLesson() || lastView !== 'lesson') {
      lastLesson = state.selectedLesson()
      var lesson = state.getLesson(state.selectedLesson())
      var element = LessonView(state, lesson)
      setView(element)
    }
  } else if (state.view() !== lastView) {
    var element = IndexView(state)
    setView(element)
  }
  lastView = state.view()
})

function setView(element) {
  if (lastElement) {
    lastElement.destroy&&lastElement.destroy()
    lastElement.remove()
  }
  document.body.appendChild(element)
  lastElement = element
}