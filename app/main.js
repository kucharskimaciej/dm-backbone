var SongView = Backbone.View.extend({
    template: _.template('<li class="list-group-item"><strong><%= author %></strong> - <%= title %></li>'),
    initialize: function () {
        console.log(this);
        this.song = {
            author: 'Megadeth',
            title: 'Ace of Spades'
        };
        this.render();
    },
    render: function () {
        this.$el.append(this.template(this.song));

        return this;
    }

});

new SongView({
    el: '.list-group'
});