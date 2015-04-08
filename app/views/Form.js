import Validation from '../mixins/Validations.js';

var FormView = Backbone.View.extend({
    events: {
        'submit form': 'onSubmit',
        'keyup form': 'runValidation'
    },
    resetModel: function () {
        this.unbindValidation();

        this.model = new this.collection.model;
        this.bindValidation();
    },

    initialize: function (opts) {
        this.template = opts.template;
        this.submitCallback = opts.submitCallback || this.submitCallback;
        this.resetModel();
        this.render();
    },
    onSubmit: function (ev) {
        ev.preventDefault();

        if(!this.runValidation()) {
            return;
        }

        this.submitCallback(this, this.model, this.collection);

        this.resetModel();
        this.render();
    },
    submitCallback: function () {
        console.warn('no submit callback provided');
    },
    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});

_.defaults(FormView.prototype, Validation);

module.exports = FormView;