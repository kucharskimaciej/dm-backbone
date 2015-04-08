import Song from '../models/Song.js';
import Sortable from '../mixins/Sortable.js';
import Filterable from '../mixins/Filterable.js';

var SongsCollection = Backbone.Collection.extend({
    model: Song,
    url: 'http://itunes.apple.com/search?term=metal&media=music&limit=10',
    parse: function (res) {
        return res.results;
    }
});

_.defaults(SongsCollection.prototype, Sortable, Filterable);

module.exports = SongsCollection;