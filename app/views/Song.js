import Render from '../mixins/Render.js';

var SongView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item',
    template: _.template('<strong><%= author %></strong> - <%= title %>')
});

_.extend(SongView.prototype, Render.item);

module.exports = SongView;