var through = require('through2')
var path = require('path')

module.exports = function (filename, opts) {
  var files = opts && opts.files || opts.f

  if (!files || !inPaths(filename, files, process.cwd())) {
    return through()
  }

  return through(
    function transform (chunk, enc, next) {
      next()
    },
    function flush (done) {
      delete require.cache[filename]
      var moduleBody = 'module.exports = ' + JSON.stringify(require(filename))
      this.push(moduleBody)
      this.push(null)
      done()
    }
  )
}

function inPaths (file, paths, cwd) {
  return paths.some(function (p) {
    return path.resolve(cwd, p) === path.resolve(cwd, file)
  })
}
