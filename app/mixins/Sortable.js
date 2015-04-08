module.exports = {
    runSort: function (what, desc) {
        var models;
        models = this.sortBy(what);
        if(desc) {
            models = models.reverse();
        }
        return new this.constructor(models);
    }
};