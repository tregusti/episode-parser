'use strict'

module.exports = function(filename) {
  var result

  if (result = parseEnglishLike(filename)) return result
  if (result = parseSceneLike(filename)) return result
  if (result = parseSceneLikeWithX(filename)) return result
  if (result = parseSceneLike000(filename)) return result

  return null
}

function parseEnglishLike(filename) {
  var m, result = { episodeCount: 1 }

  if (m = filename.match(/^(.+?)([\. ])(?:((?:20|19)\d\d)\2)?Season (\d+) (Episode (\d+))?(-(\d+))?/i)) {
    var show = m[1].replace(/\./g, ' ')
    result.show =    show
    result.season =  +m[4]
    if (m[6]) result.episode = +m[6]

    if (m[3]) result.year = +m[3]

    if (m[8]) result.episodeCount += +m[8] - result.episode

    parseDetails(filename.substr(m[0].length), result)

    return result
  }
}

function parseSceneLike(filename) {
  var m, result = { episodeCount: 1 }

  if (m = filename.match(/^(.+?)([\. ])(?:((?:20|19)\d\d)\2)?S(\d+) ?(E(\d+))?(-(E(\d+)))?/i)) {
    var show = m[1].replace(/\./g, ' ')
    result.show =    show
    result.season =  +m[4]
    if (m[6]) result.episode = +m[6]

    if (m[3]) result.year = +m[3]

    if (m[9]) result.episodeCount += +m[9] - result.episode

    parseDetails(filename.substr(m[0].length), result)

    return result
  }
}

function parseSceneLikeWithX(filename) {
  var m, result = { episodeCount: 1 }

  if (m = filename.match(/^(.+?)([\. ])(?:((?:20|19)\d\d)\2)?(\d+)x(\d+)(-(\d+))?\2/i)) {
    var show = humanize(m[1])
    result.show =    show
    result.season =  +m[4]
    result.episode = +m[5]

    if (m[7]) result.episodeCount += +m[7] - result.episode

    if (m[3]) result.year = +m[3]

    parseDetails(filename.substr(m[0].length), result)

    return result
  }
}
function parseSceneLike000(filename) {
  var m, result = { episodeCount: 1 }

  if (m = filename.match(/^(.+?)([\. ])(?:((?:20|19)\d\d)\2)?(\d\d\d+)(-(\d+))?\2/i)) {
    var show = humanize(m[1])
      .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
    result.show =    show
    var episode = m[4].substr(-2)
    result.season =  +m[4].substring(0, m[4].length - episode.length)
    result.episode = +episode

    if (m[6]) result.episodeCount += +m[6] - result.episode

    if (m[3]) result.year = +m[3]

    parseDetails(filename.substr(m[0].length), result)

    return result
  }
}
function humanize(str) {
  return str.replace(/\./g, ' ').replace(/(^- )|( -$)/, '')
}

function parseDetails(details, result) {
  var re = {
    quality:   /(480|720|1080)[pi]/,
    source:    /(hdtv|brrip|bluray|bd|dvd|dvdrip|web-?dl)/i,
    codec:     /((?:h\.|x)264|x265)/i,
    other:     /((?:real[\. ])?proper)/ig,
    group:     /-(\w+)(?:\[\w+\])?(\....)?$/,
    extension: /\.(...)$/
  }
  re.all = new RegExp(Object.keys(re).map(function(name) {
    return re[name].source
  }).join('|'), 'i')

  var reStripper = new RegExp('(.*?)(' + re.all.source + ').*$', 'i')
  var name = humanize(details.replace(reStripper, '$1')).trim()
  if (name) result.name = name

  var quality = details.match(re.quality)
  if (quality) result.quality = +quality[1]

  var source = details.match(re.source)
  if (source) {
    source = source[0].toLowerCase()
    if (source.substr(0, 1) === 'b') result.source = 'bluray'
    if (source === 'hdtv') result.source = 'hdtv'
    if (/web-?dl/.test(source)) result.source = 'webdl'
  }

  var codec = details.match(re.codec)
  if (codec) {
    codec = codec[0].toLowerCase()
    if (codec.indexOf('264') >= 0) codec = 'x264'
    result.codec = codec
  }

  var group = details.match(re.group)
  if (group) result.group = group[1]

  var extension = details.match(re.extension)
  if (extension) result.ext = extension[1]
}
