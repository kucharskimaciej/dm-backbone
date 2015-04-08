import JST from '../templates.js';
import FormView from './Form.js';

var SongForm = FormView.extend({
    template: JST['form'],
    submitCallback: function (view, model, collection) {
        collection.add(model);
    }
});

module.exports = SongForm;