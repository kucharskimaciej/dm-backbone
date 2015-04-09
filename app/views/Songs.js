import JST from '../templates.js';
import SongView from './Song.js';
import Render from '../mixins/Render.js';

var SongsView = Marionette.CompositeView.extend({
    template: JST['songs'],
    ui: {
        'filter': '#filter',
        'sortButton': '[action=sort]'
    },
    events: {
        'keyup @ui.filter': 'onFilter',
        'click @ui.sortButton': 'onSort'
    },
    collectionEvents: {
        'add' : 'onFilter'
    },
    sort: {
        by: 'author',
        desc: false
    },
    sortUpIcon: 'glyphicon-chevron-up',
    sortDownIcon: 'glyphicon-chevron-down',
    initialize: function () {
        this._collection = this.collection;
        this.render();
    },
    childViewContainer: 'ul',
    childView: SongView,
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

        this._renderChildren();
    },
    onSort: function (ev) {
        this.collection = this.runSort({
            by: this.$(ev.currentTarget).attr('by'),
            desc: !this.sort.desc
        });

        this.$(ev.currentTarget).find('.glyphicon')
            .toggleClass(this.sortUpIcon)
            .toggleClass(this.sortDownIcon);

        this._renderChildren();
    }
});


module.exports = SongsView;