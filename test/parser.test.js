var example = require('./support/example')

describe('parser', function() {
  example('Hello.S01E05.HDTV-GOTTALOVEiT', {
    show:    'Hello',
    season:  1,
    episode: 5,
    source:  'hdtv',
    group:   'GOTTALOVEiT'
  })
  example('Young.Master.S02E01.720p.HDTV-GOTTALOVEiT', {
    show:    'Young Master',
    season:  2,
    episode: 1,
    quality: 720,
    source:  'hdtv',
    group:   'GOTTALOVEiT'
  })
  example('Da.Vincis.Demons.S02E05.HDTV.x264-KILLERS.mp4', {
    show:    'Da Vincis Demons',
    season:  2,
    episode: 5,
    source:  'hdtv',
    codec:   'x264',
    group:   'KILLERS',
    ext:     'mp4'
  })
  example('House.of.Cards.2013.S02E06.720p.HDTV.x264-SKGTV.srt', {
    show:    'House of Cards',
    season:  2,
    episode: 6,
    year:    2013,
    quality: 720,
    source:  'hdtv',
    codec:   'x264',
    group:   'SKGTV',
    ext:     'srt'
  })
  example('House.of.Cards.2013.S02E06.720p.HDTV.x264-SKGTV.srt', {
    show:    'House of Cards',
    season:  2,
    episode: 6,
    year:    2013,
    quality: 720,
    source:  'hdtv',
    codec:   'x264',
    group:   'SKGTV',
    ext:     'srt'
  })
  example('girls.s01e04.720p.hdtv.x264-2hd.mkv', {
    show: 'girls',
    season: 1,
    episode: 4
  })
  example('Orange Is the New Black S01E01 I Wasn\'t Ready 720p BRRip DD5.1 x264-PSYPHER.mkv', {
    show: 'Orange Is the New Black',
    season: 1,
    episode: 1,
    name: 'I Wasn\'t Ready',
    quality: 720,
    source: 'bluray',
    codec: 'x264',
    group: 'PSYPHER',
    ext: 'mkv'
  })
  example('Monster.1x19.720p.HDTV.x264-HiPP', {
    show: 'Monster',
    season: 1,
    episode: 19,
    source: 'hdtv',
    codec: 'x264',
    group: 'HiPP'
  })
})
