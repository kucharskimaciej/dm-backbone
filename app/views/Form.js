var FormView = Backbone.View.extend({
    events: {
        'submit form': 'onSubmit',
        'keyup form': 'runValidation'
    },
    resetModel: function () {
        if(this.model) {
            Backbone.Validation.unbind(this, { model: this.model });
        }

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
        this.submitCallback = opts.submitCallback || this.submitCallback;
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

module.exports = FormView;