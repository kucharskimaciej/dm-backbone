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

var FormView = Backbone.View.extend({
    events: {
        'submit form': 'onSubmit',
        'keyup form': 'runValidation'
    },
    resetModel: function () {
        this.model = new this.collection.model;
        Backbone.Validation.bind(this, {
            model: this.model,
            valid: function (view, attr) {
                //
            },
            invalid: function (view, attr, error) {
                var errors = {};
                errors[attr] = error;
                view.showErrors(errors)
            }
        });
    },
    initialize: function (opts) {
        this.template = opts.template;
        this.resetModel();
        this.render();
    },
    clearErrors: function () {
        this.$('.help-block').remove();
        this.$('.form-group').removeClass('has-error');
        this.$('form [type=submit]').removeAttr('disabled');
    },
    showErrors: function (errors) {
        this.$('form [type=submit]').attr('disabled', 'disabled');
        Object.keys(errors).forEach((err) => {
            var help = $('<span class="help-block">').text(errors[err]);
            this.$('[name='+err+']').parents('.form-group')
                .addClass('has-error')
                .append(help);
        });
    },
    runValidation: function () {
        this.clearErrors();
        this.model.set(Backbone.Syphon.serialize(this), { validate: true });

        return this.model.isValid();
    },
    onSubmit: function (ev) {
        ev.preventDefault();

        if(!this.runValidation()) {
            return;
        }

        this.collection.add(this.model);

        this.resetModel();
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

new FormView({
    el: '#newSong',
    collection: metalSongs,
    template: _.template( $('#newSongForm').html() )
});