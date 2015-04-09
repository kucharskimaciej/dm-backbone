import Validation from '../mixins/Validations.js';
import Render from '../mixins/Render.js';

var FormView = Marionette.ItemView.extend({
    behaviors: {
        Submitable: {}
    },
    ui: {
        'form' : 'form'
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
    submitCallback: function () {
        console.warn('no submit callback provided');
    }
});

_.defaults(FormView.prototype, Validation);

module.exports = FormView;