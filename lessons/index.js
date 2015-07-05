var fs = require('fs')
var path = require('path')

module.exports = readDir(__dirname, true)

function readDir (dir, directoriesOnly) {
  return fs.readdirSync(dir).reduce(function (result, file) {
    var stat = fs.lstatSync(path.join(dir, file))
    if (stat.isDirectory()) {
      result[file] = readDir(path.join(dir, file))
    } else if (stat.isFile() && !directoriesOnly) {
      var ext = path.extname(file)
      if (ext === '.js' || ext === '.md') {
        result[file] = fs.readFileSync(path.join(dir, file), 'utf8')
      }
    }
    return result
  }, {})
}
