import FormView from './Form.js';

var SongForm = FormView.extend({
    submitCallback: function (view, model, collection) {
        collection.add(model);
    }
});

module.exports = SongForm;