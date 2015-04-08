import controller from './controller.js';

var App = Backbone.Router.extend({
    rootEl: '#root',
    currentView: null,
    routes: {
        '': 'index',
        'add': 'addSong'
    },

    index: controller.index,
    addSong:controller.addSong
});

new App;
Backbone.history.start();
