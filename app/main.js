import AppController from './controller.js';

window.App = new Marionette.Application;

var Router = Marionette.AppRouter.extend({
    controller: new AppController,
    appRoutes: {
        '': 'index',
        'add': 'addSong'
    }
});

App.Router = new Router();

App.addRegions({
    root: '#root'
});

App.on('start', function () {
    Backbone.history.start();
});

App.start();

