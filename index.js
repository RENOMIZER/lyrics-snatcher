const fetch = require('node-fetch-commonjs')

const encodeRFC3986URI = (str) => {
  return encodeURIComponent(str.replace(/ /g, "_"))
    .replace(/%5B/g, "[")
    .replace(/%5D/g, "]")
    .replace(
      /[!'()*]/g,
      (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
    );
}

/**
 * Get lyrics of practicaly any song
 * @async
 * @param {string} track_name - The track title
 * @param {string} artist_name - The artist's name
 * @param {string} album_name - The album title
 * @param {string} duration - The song duration in seconds
 * @description Example: `let lrc = await getLyrics('The Man Who Sold the World', 'David Bowie', 'The Man Who Sold the World', '241')`
 * @returns {Promise<string>}
 */
const getLyrics = async (track_name, artist_name, album_name, duration) => {
  let resp = await fetch(`https://lrclib.net/api/get?track_name=${encodeRFC3986URI(track_name)}&artist_name=${encodeRFC3986URI(artist_name)}&album_name=${encodeRFC3986URI(album_name)}&duration=${duration}`)

  if (resp.status == 200) {
    let body = await resp.json()

    if (body.syncedLyrics) {
      return body.syncedLyrics
    }
    else {
      return body.plainLyrics
    }
  }
  else {
    return new Error(`Bad request: ${resp.status}`)
  }
}

module.exports = getLyrics