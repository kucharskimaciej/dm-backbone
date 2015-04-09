import AppController from './controller.js';
import Behaviors from './behaviors';


window.App = new Marionette.Application;

var Router = Marionette.AppRouter.extend({
    controller: new AppController,
    appRoutes: {
        '': 'index',
        'add': 'addSong'
    }
});

Marionette.Behaviors.behaviorsLookup = function() {
    return Behaviors;
};

App.Router = new Router();

App.addRegions({
    root: '#root'
});

App.on('start', function () {
    Backbone.history.start();
});

App.start();

