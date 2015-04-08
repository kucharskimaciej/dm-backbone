import Songs from './resources/Songs.js';
import SongsView from './views/Songs.js';
import SongForm from './views/SongForm.js';


var metalSongs = Songs.collection();
metalSongs.fetch();

new SongsView({
    collection: metalSongs
});

new SongForm({
    el: '#newSong',
    collection: metalSongs,
    template: _.template( $('#newSongForm').html() )
});