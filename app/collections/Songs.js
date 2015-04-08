import Song from '../models/Song.js';

var SongsCollection = Backbone.Collection.extend({
    model: Song,
    runFilter: function (predicate) {
        var models;
        models = this.filter((item) => {
            return JSON.stringify(item).toLowerCase().indexOf(predicate) != -1;
        });

        return new SongsCollection(models);
    },
    runSort: function (what, desc) {
        var models;
        models = this.sortBy(what);
        if(desc) {
            models = models.reverse();
        }
        return new SongsCollection(models);
    },
    url: 'http://itunes.apple.com/search?term=metal&media=music&limit=10',
    parse: function (res) {
        return res.results;
    }
});

module.exports = SongsCollection;