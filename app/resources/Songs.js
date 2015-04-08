import Songs from '../collections/Songs.js';

var SongsResource = (function () {
    var metalSongs;

    metalSongs = new Songs();

    return {
        collection: function () {
            return metalSongs;
        }
    };
})();

module.exports = SongsResource;


