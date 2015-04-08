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

	var SongsCollection = Backbone.Collection.extend({
	    model: Song,
	    runFilter: function runFilter(predicate) {
	        var models;
	        models = this.filter(function (item) {
	            return JSON.stringify(item).toLowerCase().indexOf(predicate) != -1;
	        });

	        return new SongsCollection(models);
	    },
	    runSort: function runSort(what, desc) {
	        var models;
	        models = this.sortBy(what);
	        if (desc) {
	            models = models.reverse();
	        }
	        return new SongsCollection(models);
	    },
	    url: "http://itunes.apple.com/search?term=metal&media=music&limit=10",
	    parse: function parse(res) {
	        return res.results;
	    }
	});

	var SongView = Backbone.View.extend({
	    tagName: "li",
	    className: "list-group-item",
	    template: _.template("<strong><%= author %></strong> - <%= title %>"),
	    render: function render() {
	        this.$el.html(this.template(this.model.attributes));
	        return this;
	    }
	});

	var SongsView = Backbone.View.extend({
	    el: "#songs",
	    events: {
	        "keyup #filter": "onFilter",
	        "click [action=sort]": "onSort"
	    },
	    sort: {
	        by: "author",
	        desc: false
	    },
	    sortUpIcon: "glyphicon-chevron-up",
	    sortDownIcon: "glyphicon-chevron-down",
	    initialize: function initialize() {
	        this._collection = this.collection;
	        this.listenTo(this._collection, "add", this.onAdd);
	        this.render();
	    },
	    render: function render() {
	        var _this = this;

	        this.$("ul").empty();
	        this.collection.forEach(function (song) {
	            var view = new SongView({
	                model: song
	            });

	            _this.$("ul").append(view.render().el);
	        });

	        return this;
	    },
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

	        this.render();
	    },
	    onSort: function onSort(ev) {
	        this.collection = this.runSort({
	            by: this.$(ev.currentTarget).attr("by"),
	            desc: !this.sort.desc
	        });

	        this.$(ev.currentTarget).find(".glyphicon").toggleClass(this.sortUpIcon).toggleClass(this.sortDownIcon);

	        this.render();
	    },
	    onAdd: function onAdd() {
	        this.onFilter();
	    }
	});

	var FormView = Backbone.View.extend({
	    events: {
	        "submit form": "onSubmit",
	        "keyup form": "runValidation"
	    },
	    resetModel: function resetModel() {
	        if (this.model) {
	            Backbone.Validation.unbind(this, { model: this.model });
	        }

	        this.model = new this.collection.model();
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
	    initialize: function initialize(opts) {
	        this.template = opts.template;
	        this.submitCallback = opts.submitCallback || this.submitCallback;
	        this.resetModel();
	        this.render();
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
	    },
	    onSubmit: function onSubmit(ev) {
	        ev.preventDefault();

	        if (!this.runValidation()) {
	            return;
	        }

	        this.submitCallback(this, this.model, this.collection);

	        this.resetModel();
	        this.render();
	    },
	    submitCallback: function submitCallback() {
	        console.warn("no submit callback provided");
	    },
	    render: function render() {
	        this.$el.html(this.template(this.model.attributes));
	        return this;
	    }
	});

	var SongForm = FormView.extend({
	    submitCallback: function submitCallback(view, model, collection) {
	        collection.add(model);
	    }
	});

	var metalSongs = new SongsCollection();
	metalSongs.fetch();

	new SongsView({
	    collection: metalSongs
	});

	new SongForm({
	    el: "#newSong",
	    collection: metalSongs,
	    template: _.template($("#newSongForm").html())
	});

	//

/***/ }
/******/ ]);