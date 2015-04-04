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
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.empty();
        this.collection.forEach((song) => {
            var view = new SongView({
                model: song
            });

            this.$el.append(view.render().el);
        });

        return this;
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