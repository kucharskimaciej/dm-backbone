var Song = Backbone.Model.extend({
   defaults: {
       author: 'Unknown Artist',
       title: 'Unnamed Track'
   }
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
    songs: [
        {
            author: 'Megadeth',
            title: 'Ace of Spades'
        },
        {
            author: 'Metallica',
            title: 'For Whom The Bell Tolls'
        },
        {}
    ],
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.empty();
        this.songs.forEach((song) => {
            var view = new SongView({
                model: new Song(song)
            });

            this.$el.append(view.render().el);
        });

        return this;
    }
});

new SongsView();