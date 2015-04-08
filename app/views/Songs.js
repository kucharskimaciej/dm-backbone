import JST from '../templates.js';
import SongView from './Song.js';
import Render from '../mixins/Render.js';

var SongsView = Backbone.View.extend({
    template: JST['songs'],
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
    collectionRoot: 'ul',
    modelView: SongView,
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

        this.renderChildren();
    },
    onSort: function (ev) {
        this.collection = this.runSort({
            by: this.$(ev.currentTarget).attr('by'),
            desc: !this.sort.desc
        });

        this.$(ev.currentTarget).find('.glyphicon')
            .toggleClass(this.sortUpIcon)
            .toggleClass(this.sortDownIcon);

        this.renderChildren();
    },
    onAdd: function () {
        this.onFilter();
    }
});

_.extend(SongsView.prototype, Render.collection);

module.exports = SongsView;