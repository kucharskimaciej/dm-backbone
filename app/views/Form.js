import Validation from '../mixins/Validations.js';
import Render from '../mixins/Render.js';

var FormView = Marionette.ItemView.extend({
    ui: {
        'form' : 'form'
    },
    triggers: {
        'submit @ui.form': 'submit'
    },
    events: {
        'keyup @ui.form': 'runValidation'
    },
    resetModel: function () {
        this.unbindValidation();

        this.model = new this.collection.model;
        this.bindValidation();
    },

    initialize: function (opts) {
        this.submitCallback = opts.submitCallback || this.submitCallback;
        this.resetModel();
        this.render();
    },
    onSubmit: function () {
        if(!this.runValidation()) {
            return;
        }

        this.submitCallback(this, this.model, this.collection);

        this.resetModel();
        this.render();
    },
    submitCallback: function () {
        console.warn('no submit callback provided');
    }
});

_.defaults(FormView.prototype, Validation);

module.exports = FormView;