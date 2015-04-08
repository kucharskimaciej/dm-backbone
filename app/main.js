import Songs from './resources/Songs.js';
import SongsView from './views/Songs.js';
import SongForm from './views/SongForm.js';

var App = Backbone.Router.extend({
    rootEl: '#root',
    currentView: null,
    routes: {
        '': 'index',
        'add': 'addSong'
    },

    index: function () {
        if(this.currentView) {
            this.currentView.stopListening();
            this.currentView.undelegateEvents();
        }
        var songs = Songs.collection();

        this.currentView = new SongsView({
            el: this.rootEl,
            collection: songs
        });

        songs.fetch({ remove: false });
    },
    addSong: function () {
        if(this.currentView) {
            this.currentView.stopListening();
            this.currentView.undelegateEvents();
        }
        var songs = Songs.collection();

        this.currentView = new SongForm({
            el: this.rootEl,
            collection: songs
        });
    }
});

new App;
Backbone.history.start();
