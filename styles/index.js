var fs = require('fs')
var path = require('path')
var compile = require('micro-css')
var result = ''

fs.readdirSync(__dirname).forEach(function(file){
  if (/\.mcss$/i.test(file)) {
    result += fs.readFileSync(path.resolve(__dirname, file), 'utf8') + '\n'
  }
})

var additional = fs.readFileSync(require.resolve('highlight.js/styles/monokai.css'), 'utf8')

module.exports = compile(result) + additional