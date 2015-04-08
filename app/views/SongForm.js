import JST from '../templates.js';
import FormView from './Form.js';

var SongForm = FormView.extend({
    template: JST['form'],
    submitCallback: function (view, model, collection) {
        collection.add(model);
        window.setTimeout(function () {
            Backbone.history.navigate('', { trigger: true });
        }, 0);
    }
});

module.exports = SongForm;