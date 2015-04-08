var ValidationMixin = {
    unbindValidation: function () {
        if(this.model) {
            Backbone.Validation.unbind(this, { model: this.model });
        }
    },
    bindValidation: function () {
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
    }
};

module.exports = ValidationMixin;