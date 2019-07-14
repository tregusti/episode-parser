enum Source {
  BluRay = 'bluray',
  HDTV = 'hdtv',
  WebDL = 'webdl',
}

interface Result {
  show: string;
  episodeCount: number;
  season: number;
  episode?: number;
  year?: number;
  name?: string;
  codec?: string;
  quality?: number;
  source?: Source;
  group?: string;
  ext?: string;
}

const parsers = [
  parseEnglishLike,
  parseSceneLike,
  parseSceneLikeWithX,
  parseSceneLike000,
]
export = function(filename: string) {
  for (let i = 0; i < parsers.length; i += 1) {
    const result = parsers[i](filename)
    if (result) return result
  }
  return null
}

function parseEnglishLike(filename: string) {
  const m = filename.match(
    /^(.+?)([\. ])(?:((?:20|19)\d\d)\2)?Season (\d+) (Episode (\d+))?(-(\d+))?/i
  )

  if (m) {
    const result: Result = {
      episodeCount: 1,
      show: m[1].replace(/\./g, ' '),
      season: +m[4],
    }

    if (m[6]) {
      result.episode = +m[6]
      if (m[8]) result.episodeCount += +m[8] - result.episode
    }

    if (m[3]) result.year = +m[3]

    parseDetails(filename.substr(m[0].length), result)

    return result
  }
}

function parseSceneLike(filename: string) {
  const m = filename.match(
    /^(.+?)([\. ])(?:((?:20|19)\d\d)\2)?S(\d+) ?(E(\d+))?(-(E(\d+)))?/i
  )

  if (m) {
    const result: Result = {
      episodeCount: 1,
      show: m[1].replace(/\./g, ' '),
      season: +m[4],
    }

    if (m[6]) {
      result.episode = +m[6]
      if (m[9]) result.episodeCount += +m[9] - result.episode
    }

    if (m[3]) result.year = +m[3]

    parseDetails(filename.substr(m[0].length), result)

    return result
  }
}

function parseSceneLikeWithX(filename: string) {
  const m = filename.match(
    /^(.+?)([\. ])(?:((?:20|19)\d\d)\2)?(\d+)x(\d+)(-(\d+))?\2/i
  )

  if (m) {
    const episode = +m[5]
    const result: Result = {
      episodeCount: 1,
      show: humanize(m[1]),
      season: +m[4],
      episode,
    }

    if (m[7]) result.episodeCount += +m[7] - episode

    if (m[3]) result.year = +m[3]

    parseDetails(filename.substr(m[0].length), result)

    return result
  }
}

function parseSceneLike000(filename: string) {
  const m = filename.match(
    /^(.+?)([\. ])(?:((?:20|19)\d\d)\2)?(\d\d\d+)(-(\d+))?\2/i
  )

  if (m) {
    const episode = m[4].substr(-2)
    const result: Result = {
      episodeCount: 1,
      show: humanize(m[1]).replace(
        /\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      ),
      episode: +episode,
      season: +m[4].substring(0, m[4].length - episode.length),
    }

    if (m[6]) result.episodeCount += +m[6] - +episode

    if (m[3]) result.year = +m[3]

    parseDetails(filename.substr(m[0].length), result)

    return result
  }
}

function humanize(str: string) {
  return str.replace(/\./g, ' ').replace(/(^- )|( -$)/, '')
}

function parseDetails(details: string, result: Result) {
  const re = {
    quality: /(480|720|1080)[pi]/,
    source: /(hdtv|brrip|bluray|bd|dvd|dvdrip|web-?dl)/i,
    codec: /((?:h\.|x)264|x265)/i,
    other: /((?:real[\. ])?proper)/gi,
    group: /-(\w+)(?:\[\w+\])?(\....)?$/,
    extension: /\.(...)$/,
  }

  const reAll = new RegExp(
    (Object.keys(re) as Array<keyof typeof re>)
      .map(name => re[name].source)
      .join('|'),
    'i'
  )

  const reStripper = new RegExp('(.*?)(' + reAll.source + ').*$', 'i')
  const name = humanize(details.replace(reStripper, '$1')).trim()
  if (name) result.name = name

  const quality = details.match(re.quality)
  if (quality) result.quality = +quality[1]

  const sourceMatch = details.match(re.source)
  if (sourceMatch) {
    const source = sourceMatch[0].toLowerCase()
    if (source.substr(0, 1) === 'b') result.source = Source.BluRay
    if (source === 'hdtv') result.source = Source.HDTV
    if (/web-?dl/.test(source)) result.source = Source.WebDL
  }

  const codecMatch = details.match(re.codec)
  if (codecMatch) {
    const codec = codecMatch[0].toLowerCase()
    if (codec.indexOf('264') >= 0) result.codec = 'x264'
    else result.codec = codec
  }

  const group = details.match(re.group)
  if (group) result.group = group[1]

  const extension = details.match(re.extension)
  if (extension) result.ext = extension[1]
}
