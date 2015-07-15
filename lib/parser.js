module.exports = function(filename) {
  var result

  if (result = parseSceneLike(filename)) return result

  return null
}

function parseSceneLike(filename) {
  var m, result = {}

  if (m = filename.match(/^(.+?)([\. ])(?:((?:20|19)\d\d)\2)?S(\d+)E(\d+)\2/i)) {
    var show = m[1].replace(/\./g, ' ')
    result.show =    show
    result.season =  +m[4]
    result.episode = +m[5]

    if (m[3]) result.year = +m[3]

    var details = filename.substr(m.lastIndex)

    var quality = details.match(/(480|720|1080)[pi]/)
    if (quality) result.quality = +quality[1]

    var source = details.match(/(hdtv)/i)
    if (source) result.source = source[0].toLowerCase()

    var codec = details.match(/(x264|x265)/i)
    if (codec) result.codec = codec[0].toLowerCase()

    m = details.match(/(\w+)+(?:\.(...))?$/)
    if (m) {
      result.group = m[1];

      if (m[2]) result.ext = m[2]
    }

    return result
  }
}
