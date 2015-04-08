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
	        "submit form": "onSubmit"
	    },
	    getModel: function getModel() {
	        return new this.collection.model();
	    },
	    initialize: function initialize(opts) {
	        this.template = opts.template;
	        this.model = this.getModel();
	        this.render();
	    },
	    serialize: function serialize() {
	        var serialized = {};
	        this.$("input, textarea, select").each(function (index, el) {
	            serialized[el.getAttribute("name")] = el.value;
	        });
	        return serialized;
	    },
	    onSubmit: function onSubmit(ev) {
	        ev.preventDefault();

	        this.model.set(this.serialize());

	        this.collection.add(this.model);
	        this.model = this.getModel();

	        this.render();
	    },
	    render: function render() {
	        this.$el.html(this.template(this.model.attributes));
	        return this;
	    }
	});

	var metalSongs = new SongsCollection([{
	    author: "Megadeth",
	    title: "Ace of Spades"
	}, {
	    author: "Metallica",
	    title: "For Whom The Bell Tolls"
	}, {
	    author: "Satyricon",
	    title: "K.I.N.G"
	}, {
	    author: "Alice Cooper",
	    title: "Poison"
	}, {
	    author: "Ron James Dio",
	    title: "Holy diver"
	}]);
	new SongsView({
	    collection: metalSongs
	});

	new FormView({
	    el: "#newSong",
	    collection: metalSongs,
	    template: _.template($("#newSongForm").html())
	});

/***/ }
/******/ ]);