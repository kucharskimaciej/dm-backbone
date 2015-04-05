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
	    model: Song
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
	        "keyup #filter": "onFilter"
	    },
	    initialize: function initialize() {
	        this._collection = this.collection;
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
	    onFilter: function onFilter() {
	        var filter, models;
	        filter = this.$("#filter").val().toLowerCase();

	        models = this._collection.filter(function (item) {
	            return JSON.stringify(item).toLowerCase().indexOf(filter) != -1;
	        });

	        // _collection.constructor refers to SongsCollection
	        this.collection = new this._collection.constructor(models);
	        this.render();
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

/***/ }
/******/ ]);