'use strict'

var example = require('./support/example')

describe('parser', function() {
  example('Hello 2014 Season 01 Episode 1 the Problem 720p.HDTV.x264-SKGTV.srt', {
    show:    'Hello',
    season:  1,
    episode: 1,
    name: 'the Problem',
    year: 2014,
    quality: 720,
    source: 'hdtv',
    codec: 'x264',
    group: 'SKGTV',
    ext: 'srt'
  })
  example('Hello 2014 Season 01 Episode 1-4 the Problem 720p.HDTV.x264-SKGTV.srt', {
    show:    'Hello',
    season:  1,
    episode: 1,
    name: 'the Problem',
    year: 2014,
    quality: 720,
    source: 'hdtv',
    codec: 'x264',
    group: 'SKGTV',
    ext: 'srt',
    episodeCount: 4
  })
  
  example('comedians in cars getting coffee S1 E1', {
    show:    'comedians in cars getting coffee',
    season:  1,
    episode: 1,
  })
  example('battlestar galactica s01e01-e03 - saga of a star world.mp4', {
    show:    'battlestar galactica',
    season:  1,
    episode: 1,
    episodeCount: 3,
  })

  example('full frontal with samantha bee s01e14.mkv', {
    show:    'full frontal with samantha bee',
    season:  1,
    episode: 14,
    episodeCount: 1,
  })

  example('Goodbye.S01E08.DVDRip-S0ME', {
    show:    'Goodbye',
    season:  1,
    episode: 8,
    source:  'dvd',
  })
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

  example('Monster.S01E01.264.days.of.horror.720p.mkv', {
    source: undefined,
    codec: undefined,
    name: '264 days of horror'
  })
  describe('codec', function() {
    example('Show.S01E01.Name.720p.H.264-Group', {
      show: 'Show',
      name: 'Name',
      codec: 'x264',
    })
    example('Show.S01E01.Name.720p.H.265-Group', {
      show: 'Show',
      name: 'Name',
      codec: 'x265',
    })
    example('Show.S01E01.Name.720p.x264-Group', {
      show: 'Show',
      name: 'Name',
      codec: 'x264',
    })
    example('Show.S01E01.Name.720p.x265-Group', {
      show: 'Show',
      name: 'Name',
      codec: 'x265',
    })
  })
  example('Hannibal.S02E09.Shizakana.720p.WEB-DL.DD5.1.H.264-NTb', {
    show: 'Hannibal',
    name: 'Shizakana',
    source: 'webdl',
    codec: 'x264',
    group: 'NTb'
  })
  example('True.Blood.S07E06.Karma.PROPER.720p.HDTV.x264-KILLERS', {
    show: 'True Blood',
    season: 7,
    episode: 6,
    name: 'Karma',
    quality: 720,
    source: 'hdtv',
    codec: 'x264',
    group: 'KILLERS'
  })
  example('Fairly Legal S02E02 Start Me Up.mkv', {
    show: 'Fairly Legal',
    season: 2,
    episode: 2,
    name: 'Start Me Up',
    ext: 'mkv'
  })
  example('Orphan.Black.S03E05.Scarred.by.Many.Past.Frustrations.720p.HDTV.x264-KILLERS[rarbg]', {
    group: 'KILLERS',
    name: 'Scarred by Many Past Frustrations'
  })
  example('Futurama.S06.1080p.BluRay.DTS.x264-CtrlHD', {
    show: 'Futurama',
    season: 6,
    quality: 1080,
    source: 'bluray',
    codec: 'x264',
    group: 'CtrlHD'
  })
  example('the.good.wife.709.hdtv-lol', {
    show: 'The Good Wife',
    season: 7,
    episode: 9,
    source: 'hdtv',
    group: 'lol'
  })
  example('ray.donovan.312.720p-dimension', {
    show: 'Ray Donovan',
    season: 3,
    episode: 12,
    quality: 720,
    group: 'dimension'
  })
  example('the.big.bang.theory.1017.hdtv-lol', {
    show: 'The Big Bang Theory',
    season: 10,
    episode: 17,
    source: 'hdtv',
    group: 'lol'
  })
  example('the.big.bang.theory.1017-19.hdtv-lol', {
    show: 'The Big Bang Theory',
    season: 10,
    episode: 17,
    episodeCount: 3,
    source: 'hdtv',
    group: 'lol'
  })
  example('Homeland - 03x09 - Horse and Wagon', {
    show: 'Homeland',
    season: 3,
    episode: 9,
    name: 'Horse and Wagon'
  })
  example('Homeland - 03x09-10 - Horse and Wagon', {
    show: 'Homeland',
    season: 3,
    episode: 9,
    episodeCount: 2,
    name: 'Horse and Wagon'
  })
})
