var ItemRender = {
    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
};
var CollectionRender = {
    render: function () {
        if(this.template) {
            this.$el.html(this.template());
        }

        var collectionRoot = this.$(this.collectionRoot) || this.$el;
        collectionRoot.empty();
        this.collection.forEach((item) => {
            var view = new this.modelView({
                model: item
            });

            collectionRoot.append(view.render().el);
        });

        return this;
    }
};

module.exports = {
    item: ItemRender,
    collection: CollectionRender
};