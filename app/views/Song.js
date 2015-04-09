import Render from '../mixins/Render.js';

var SongView = Marionette.ItemView.extend({
    tagName: 'li',
    className: 'list-group-item',
    template: _.template('<strong><%= author %></strong> - <%= title %>')
});


module.exports = SongView;