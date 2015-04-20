var h = require('micro-css/h')(require('hyperscript'))
var send = require('../lib/send')

module.exports = IndexView

function IndexView(state) {
  return h('Index', [
    h('header', [ 'Web Audio School']),
    h('div', [
      h('ul', state.lessons().map(function(group) {
        return h('li', [
          h('h1', [ removeNumber(group.name) ]),
          h('ul', group.lessons.map(function(lesson) {
            var classes = []
            
            if (state.verifiedLessons.has(lesson.path)) {
              classes.push('-verified')
            }

            if (state.selectedLesson() === lesson.path) {
              classes.push('-selected')
            }

            return h('li', {
              onclick: send(state.viewLesson, lesson.path), 
              tabIndex: 0, 
              className: classes.join(' ') 
            }, [ lesson.title ])
          }))
        ])
      }))
    ])
  ])
}

function removeNumber(text) {
  var match = /^([0-9]+\. )(.+)$/.exec(text)
  return match && match[2] || text
}