import Songs from './resources/Songs.js';
import SongsView from './views/Songs.js';
import SongForm from './views/SongForm.js';

var AppController = (function () {
    var currentView, rootEl;
    rootEl = '#root';

    function clear(view) {
        if(view) {
            view.stopListening();
            view.undelegateEvents();
        }
    }

    function index () {
        clear(currentView);
        var songs = Songs.collection();

        currentView = new SongsView({
            el: rootEl,
            collection: songs
        });

        songs.fetch({ remove: false });
    }

    function addSong () {
        clear(currentView);
        var songs = Songs.collection();

        currentView = new SongForm({
            el: rootEl,
            collection: songs
        });
    }

    return {
        index: index,
        addSong: addSong
    };
})();

module.exports = AppController;