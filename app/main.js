var Song = Backbone.Model.extend({
   defaults: {
       author: 'Unknown Artist',
       title: 'Unnamed Track'
   }
});

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
    events: {
        'keyup #filter': 'onFilter',
        'click [action=sort]': 'onSort'
    },
    filter: {
        by: 'author',
        desc: false
    },
    sortUpIcon: 'glyphicon-chevron-up',
    sortDownIcon: 'glyphicon-chevron-down',
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
        var filter;
        filter = this.$('#filter').val().toLowerCase();
        this.collection = this._collection.runFilter(filter);

        this.render();
    },
    onSort: function (ev) {
        this.filter = {
            by: this.$(ev.currentTarget).attr('by'),
            desc: !this.filter.desc
        };

        this.collection = this.collection.runSort(this.filter.by, this.filter.desc);

        this.$(ev.currentTarget).find('.glyphicon')
            .toggleClass(this.sortUpIcon)
            .toggleClass(this.sortDownIcon);

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