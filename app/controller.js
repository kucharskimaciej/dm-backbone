import Songs from './resources/Songs.js';
import SongsView from './views/Songs.js';
import SongForm from './views/SongForm.js';

var AppController = Marionette.Controller.extend({

    index: function index () {
        var songs = Songs.collection();
        var view = new SongsView({
            collection: songs
        });

        window.App.root.show(view);
        songs.fetch({ remove: false });
    },
    addSong: function addSong () {
        var songs = Songs.collection();

        var view  = new SongForm({
            collection: songs
        });

        window.App.root.show(view);
    }
});

module.exports = AppController;