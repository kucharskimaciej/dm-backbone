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
	    songs: [{
	        author: "Megadeth",
	        title: "Ace of Spades"
	    }, {
	        author: "Metallica",
	        title: "For Whom The Bell Tolls"
	    }],
	    initialize: function initialize() {
	        this.render();
	    },
	    render: function render() {
	        var _this = this;

	        this.$el.empty();
	        this.songs.forEach(function (song) {
	            var view = new SongView({
	                model: new Backbone.Model(song)
	            });

	            _this.$el.append(view.render().el);
	        });

	        return this;
	    }
	});

	new SongsView();

/***/ }
/******/ ]);