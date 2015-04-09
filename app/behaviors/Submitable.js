module.exports = Marionette.Behavior.extend({
    ui: {
        'form': 'form'
    },
    triggers: {
        'submit @ui.form': 'submit'
    },
    onSubmit: function () {
        if(this.view.runValidation && !this.view.runValidation()) {
            return;
        }

        this.view.submitCallback(
            this.view,
            this.view.model,
            this.view.collection
        );

        this.view.resetModel();
        this.view.render();
    }
});