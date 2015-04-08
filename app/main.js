import Songs from './collections/Songs.js';
import SongsView from './views/Songs.js';
import SongForm from './views/SongForm.js';


var metalSongs = new Songs();
metalSongs.fetch();

new SongsView({
    collection: metalSongs
});

new SongForm({
    el: '#newSong',
    collection: metalSongs,
    template: _.template( $('#newSongForm').html() )
});

