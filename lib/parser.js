module.exports = function(filename) {
  var result

  if (result = parseSceneLike(filename)) return result
  if (result = parseSceneLikeWithX(filename)) return result

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

    parseDetails(filename.substr(m[0].length), result)

    return result
  }
}

function parseSceneLikeWithX(filename) {
  var m, result = {}

  if (m = filename.match(/^(.+?)([\. ])(?:((?:20|19)\d\d)\2)?(\d+)x(\d+)\2/i)) {
    var show = m[1].replace(/\./g, ' ')
    result.show =    show
    result.season =  +m[4]
    result.episode = +m[5]

    if (m[3]) result.year = +m[3]

    parseDetails(filename.substr(m[0].length), result)

    return result
  }
}

function parseDetails(details, result) {
  var re = {
    quality: /(480|720|1080)[pi]/,
    source:  /(hdtv|brrip|bluray|bd|dvd|dvdrip)/i,
    codec:   /(x264|x265)/i
  }
  re.all = new RegExp(Object.keys(re).map(function(name) {
    return re[name].source
  }).join('|'), 'i')

  var reStripper = new RegExp('(.*?)(' + re.all.source + ').*$', 'i')
  var name = details.replace(reStripper, '$1').trim()
  if (name) result.name = name

  var quality = details.match(re.quality)
  if (quality) result.quality = +quality[1]

  var source = details.match(re.source)
  if (source) {
    source = source[0].toLowerCase()
    if (source.substr(0, 1) === 'b') result.source = 'bluray'
    if (source === 'hdtv') result.source = 'hdtv'
  }

  var codec = details.match(re.codec)
  if (codec) result.codec = codec[0].toLowerCase()

  m = details.match(/(\w+)+(?:\.(...))?$/)
  if (m) {
    result.group = m[1];
    if (m[2]) result.ext = m[2]
  }
}
