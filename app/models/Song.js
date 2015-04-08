var Song = Backbone.Model.extend({
    defaults: {
        author: 'Unknown Artist',
        title: 'Unnamed Track'
    },
    validation: {
        title: {
            required: true,
            msg: 'You must provide the title'
        },
        author: {
            required: true,
            msg: 'You must provide the author'
        }
    },
    parse: function (attr) {
        return {
            author: attr.artistName,
            title: attr.trackName,
            id: attr.trackId,
            price: attr.trackPrice
        };
    }

});

module.exports = Song;