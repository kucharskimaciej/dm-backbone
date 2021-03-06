/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var AppController = _interopRequire(__webpack_require__(1));

	var Behaviors = _interopRequire(__webpack_require__(15));

	window.App = new Marionette.Application();

	var Router = Marionette.AppRouter.extend({
	    controller: new AppController(),
	    appRoutes: {
	        "": "index",
	        add: "addSong"
	    }
	});

	Marionette.Behaviors.behaviorsLookup = function () {
	    return Behaviors;
	};

	App.Router = new Router();

	App.addRegions({
	    root: "#root"
	});

	App.on("start", function () {
	    Backbone.history.start();
	});

	App.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var Songs = _interopRequire(__webpack_require__(3));

	var SongsView = _interopRequire(__webpack_require__(4));

	var SongForm = _interopRequire(__webpack_require__(5));

	var AppController = Marionette.Controller.extend({

	    index: function index() {
	        var songs = Songs.collection();
	        var view = new SongsView({
	            collection: songs
	        });

	        window.App.root.show(view);
	        songs.fetch({ remove: false });
	    },
	    addSong: function addSong() {
	        var songs = Songs.collection();

	        var view = new SongForm({
	            collection: songs
	        });

	        window.App.root.show(view);
	    }
	});

	module.exports = AppController;

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var Songs = _interopRequire(__webpack_require__(6));

	var SongsResource = (function () {
	    var metalSongs;

	    metalSongs = new Songs();

	    return {
	        collection: function collection() {
	            return metalSongs;
	        }
	    };
	})();

	module.exports = SongsResource;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var JST = _interopRequire(__webpack_require__(7));

	var SongView = _interopRequire(__webpack_require__(8));

	var Render = _interopRequire(__webpack_require__(9));

	var SongsView = Marionette.CompositeView.extend({
	    template: JST.songs,
	    ui: {
	        filter: "#filter",
	        sortButton: "[action=sort]"
	    },
	    events: {
	        "keyup @ui.filter": "onFilter",
	        "click @ui.sortButton": "onSort"
	    },
	    collectionEvents: {
	        add: "onFilter"
	    },
	    sort: {
	        by: "author",
	        desc: false
	    },
	    sortUpIcon: "glyphicon-chevron-up",
	    sortDownIcon: "glyphicon-chevron-down",
	    initialize: function initialize() {
	        this._collection = this.collection;
	        this.render();
	    },
	    childViewContainer: "ul",
	    childView: SongView,
	    runFilter: function runFilter() {
	        var filter;
	        filter = this.$("#filter").val().toLowerCase();

	        return this._collection.runFilter(filter);
	    },
	    runSort: function runSort(sort) {
	        this.sort = sort;

	        return this.collection.runSort(this.sort.by, this.sort.desc);
	    },
	    onFilter: function onFilter() {
	        this.collection = this.runFilter();
	        this.collection = this.runSort(this.sort);

	        this._renderChildren();
	    },
	    onSort: function onSort(ev) {
	        this.collection = this.runSort({
	            by: this.$(ev.currentTarget).attr("by"),
	            desc: !this.sort.desc
	        });

	        this.$(ev.currentTarget).find(".glyphicon").toggleClass(this.sortUpIcon).toggleClass(this.sortDownIcon);

	        this._renderChildren();
	    }
	});

	module.exports = SongsView;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var JST = _interopRequire(__webpack_require__(7));

	var FormView = _interopRequire(__webpack_require__(10));

	var SongForm = FormView.extend({
	    template: JST.form,
	    submitCallback: function submitCallback(view, model, collection) {
	        collection.add(model);
	        window.setTimeout(function () {
	            Backbone.history.navigate("", { trigger: true });
	        }, 0);
	    }
	});

	module.exports = SongForm;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var Song = _interopRequire(__webpack_require__(12));

	var Sortable = _interopRequire(__webpack_require__(13));

	var Filterable = _interopRequire(__webpack_require__(14));

	var SongsCollection = Backbone.Collection.extend({
	    model: Song,
	    url: "http://itunes.apple.com/search?term=metal&media=music&limit=10",
	    parse: function parse(res) {
	        return res.results;
	    }
	});

	_.defaults(SongsCollection.prototype, Sortable, Filterable);

	module.exports = SongsCollection;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var JST = {};

	JST.songs = _.template("\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <h1>Hello Backbone <a href=\"#/add\" class=\"btn btn-default pull-right\">Add new song</a></h1>\n\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <button action=\"sort\" by=\"author\" class=\"btn btn-default\">\n                    <i class=\"glyphicon glyphicon-chevron-down\"></i>\n                    Author\n                </button>\n                <button action=\"sort\" by=\"title\" class=\"btn btn-default\">\n                    <i class=\"glyphicon glyphicon-chevron-down\"></i>\n                    Title\n                </button>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <input class=\"form-control\" type=\"text\" id=\"filter\" placeholder=\"Filter...\"/>\n            </div>\n        </div>\n        <ul class=\"list-group\"></ul>\n    </div>\n</div>\n");

	JST.form = _.template("\n<div class=\"row\">\n    <h2 class=\"col-sm-12\">Add a new song</h2>\n    <form class=\"col-sm-12\">\n        <div class=\"form-group\">\n            <label for=\"author\">Author</label>\n            <input type=\"text\" name=\"author\" id=\"author\" class=\"form-control\" value=\"<%= author %>\"/>\n        </div>\n\n        <div class=\"form-group\">\n            <label for=\"title\">Title</label>\n            <input type=\"text\" name=\"title\" id=\"title\" class=\"form-control\" value=\"<%= title %>\"/>\n        </div>\n        <div class=\"form-group\">\n            <button type=\"submit\" class=\"btn btn-success\">Submit</button>\n            <a href=\"#/\" type=\"submit\" class=\"btn btn-default\">Back</a>\n        </div>\n    </form>\n</div>\n");

	module.exports = JST;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var Render = _interopRequire(__webpack_require__(9));

	var SongView = Marionette.ItemView.extend({
	    tagName: "li",
	    className: "list-group-item",
	    template: _.template("<strong><%= author %></strong> - <%= title %>")
	});

	module.exports = SongView;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var ItemRender = {
	    render: function render() {
	        this.$el.html(this.template(this.model.attributes));
	        return this;
	    }
	};
	var CollectionRender = {
	    render: function render() {
	        if (this.template) {
	            this.$el.html(this.template());
	        }
	        this.renderChildren();
	        return this;
	    },
	    renderChildren: function renderChildren() {
	        var _this = this;

	        var collectionRoot = this.$(this.collectionRoot) || this.$el;
	        collectionRoot.empty();
	        this.collection.forEach(function (item) {
	            var view = new _this.modelView({
	                model: item
	            });

	            collectionRoot.append(view.render().el);
	        });

	        return this;
	    }
	};

	module.exports = {
	    item: ItemRender,
	    collection: CollectionRender
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var Validation = _interopRequire(__webpack_require__(11));

	var Render = _interopRequire(__webpack_require__(9));

	var FormView = Marionette.ItemView.extend({
	    behaviors: {
	        Submitable: {}
	    },
	    ui: {
	        form: "form"
	    },
	    events: {
	        "keyup @ui.form": "runValidation"
	    },
	    resetModel: function resetModel() {
	        this.unbindValidation();

	        this.model = new this.collection.model();
	        this.bindValidation();
	    },

	    initialize: function initialize(opts) {
	        this.submitCallback = opts.submitCallback || this.submitCallback;
	        this.resetModel();
	        this.render();
	    },
	    submitCallback: function submitCallback() {
	        console.warn("no submit callback provided");
	    }
	});

	_.defaults(FormView.prototype, Validation);

	module.exports = FormView;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var ValidationMixin = {
	    unbindValidation: function unbindValidation() {
	        if (this.model) {
	            Backbone.Validation.unbind(this, { model: this.model });
	        }
	    },
	    bindValidation: function bindValidation() {
	        Backbone.Validation.bind(this, {
	            model: this.model,
	            valid: function valid(view, attr) {},
	            invalid: function invalid(view, attr, error) {
	                var errors = {};
	                errors[attr] = error;
	                view.showErrors(errors);
	            }
	        });
	    },
	    clearErrors: function clearErrors() {
	        this.$(".help-block").remove();
	        this.$(".form-group").removeClass("has-error");
	        this.$("form [type=submit]").removeAttr("disabled");
	    },
	    showErrors: function showErrors(errors) {
	        var _this = this;

	        this.$("form [type=submit]").attr("disabled", "disabled");
	        Object.keys(errors).forEach(function (err) {
	            var help = $("<span class=\"help-block\">").text(errors[err]);
	            _this.$("[name=" + err + "]").parents(".form-group").addClass("has-error").append(help);
	        });
	    },
	    runValidation: function runValidation() {
	        this.clearErrors();
	        this.model.set(Backbone.Syphon.serialize(this), { validate: true });

	        return this.model.isValid();
	    }
	};

	module.exports = ValidationMixin;

	//

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Song = Backbone.Model.extend({
	    defaults: {
	        author: "Unknown Artist",
	        title: "Unnamed Track"
	    },
	    validation: {
	        title: {
	            required: true,
	            msg: "You must provide the title"
	        },
	        author: {
	            required: true,
	            msg: "You must provide the author"
	        }
	    },
	    parse: function parse(attr) {
	        return {
	            author: attr.artistName,
	            title: attr.trackName,
	            id: attr.trackId,
	            price: attr.trackPrice
	        };
	    }

	});

	module.exports = Song;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
	    runSort: function runSort(what, desc) {
	        var models;
	        models = this.sortBy(what);
	        if (desc) {
	            models = models.reverse();
	        }
	        return new this.constructor(models);
	    }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
	    runFilter: function runFilter(predicate) {
	        var models;
	        models = this.filter(function (item) {
	            return JSON.stringify(item).toLowerCase().indexOf(predicate) != -1;
	        });

	        return new this.constructor(models);
	    }
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var Submitable = _interopRequire(__webpack_require__(16));

	module.exports = { Submitable: Submitable };

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = Marionette.Behavior.extend({
	    ui: {
	        form: "form"
	    },
	    triggers: {
	        "submit @ui.form": "submit"
	    },
	    onSubmit: function onSubmit() {
	        if (this.view.runValidation && !this.view.runValidation()) {
	            return;
	        }

	        this.view.submitCallback(this.view, this.view.model, this.view.collection);

	        this.view.resetModel();
	        this.view.render();
	    }
	});

/***/ }
/******/ ]);