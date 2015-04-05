var Song = Backbone.Model.extend({
   defaults: {
       author: 'Unknown Artist',
       title: 'Unnamed Track'
   }
});

var SongsCollection = Backbone.Collection.extend({
    model: Song
});

var SongView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item',
    template: _.template('<strong><%= author %></strong> - <%= title %>'),
    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});

var SongsView = Backbone.View.extend({
    el: '#songs',
    events: {
        'keyup #filter': 'onFilter'
    },
    initialize: function () {
        this._collection = this.collection;
        this.render();
    },
    render: function () {
        this.$('ul').empty();
        this.collection.forEach((song) => {
            var view = new SongView({
                model: song
            });

            this.$('ul').append(view.render().el);
        });

        return this;
    },
    onFilter: function () {
        var filter, models;
        filter = this.$('#filter').val().toLowerCase();

        models = this._collection.filter((item) => {
            return JSON.stringify(item).toLowerCase().indexOf(filter) != -1;
        });

        // _collection.constructor refers to SongsCollection
        this.collection = new this._collection.constructor(models);
        this.render();
    }
});


var metalSongs = new SongsCollection([
    {
        author: 'Megadeth',
        title: 'Ace of Spades'
    },
    {
        author: 'Metallica',
        title: 'For Whom The Bell Tolls'
    },
    {
        author: 'Satyricon',
        title: 'K.I.N.G'
    },
    {
        author: 'Alice Cooper',
        title: 'Poison'
    },
    {
        author: 'Ron James Dio',
        title: 'Holy diver'
    }
]);
new SongsView({
    collection: metalSongs
});