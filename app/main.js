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
    sort: {
        by: 'author',
        desc: false
    },
    sortUpIcon: 'glyphicon-chevron-up',
    sortDownIcon: 'glyphicon-chevron-down',
    initialize: function () {
        this._collection = this.collection;
        this.listenTo(this._collection, 'add', this.onAdd);
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
    runFilter: function () {
        var filter;
        filter = this.$('#filter').val().toLowerCase();

        return this._collection.runFilter(filter);
    },
    runSort: function (sort) {
        this.sort = sort;

        return this.collection.runSort(this.sort.by, this.sort.desc);
    },
    onFilter: function () {
        this.collection = this.runFilter();
        this.collection = this.runSort(this.sort);

        this.render();
    },
    onSort: function (ev) {
        this.collection = this.runSort({
            by: this.$(ev.currentTarget).attr('by'),
            desc: !this.sort.desc
        });

        this.$(ev.currentTarget).find('.glyphicon')
            .toggleClass(this.sortUpIcon)
            .toggleClass(this.sortDownIcon);

        this.render();
    },
    onAdd: function () {
        this.onFilter();
    }
});

var NewSongView = Backbone.View.extend({
    el: '#newSong',
    events: {
        'submit form': 'onSubmit'
    },
    getModel: function () {
      return new this.collection.model;
    },
    initialize: function (opts) {
        this.template = opts.template;
        this.model = this.getModel();
        this.render();
    },
    serialize: function () {
        var serialized = {};
        this.$('input, textarea, select').each(function (index, el) {
            serialized[el.getAttribute('name')] = el.value;
        });
        return serialized;
    },
    onSubmit: function (ev) {
        ev.preventDefault();

        this.model.set(this.serialize());

        this.collection.add(this.model);
        this.model = this.getModel();

        this.render();
    },
    render: function () {
        this.$el.html(this.template(this.model.attributes));
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

new NewSongView({
    collection: metalSongs,
    template: _.template( $('#newSongForm').html() )
});