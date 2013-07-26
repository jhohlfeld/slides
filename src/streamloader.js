//streamloader.js

/**
 * The streamloader object takes care of loading an html
 * into a stream (string object) and at the same time
 * distributes this stream as a number of sections.
 *
 * The streamloader object returns a pormise
 * with an html string loaded via ajax.
 *
 * Use it's load() method to get started.
 *
 * @example
 *     loader = new Loader();
 *     loader.load('http://so.me/html/')
 *
 * The `loader.html` will contain the raw html
 * stream, `loader.sections` the distributed node
 * elements as array of arrays (of elements).
 *
 * @module streamloader
 * @main streamloader
 *
 */
define(['jquery'], function($) {

	/**
	 * The Loader object.
	 *
	 * @class streamloader.Loader
	 * @constructor
	 */
	var Loader = function(options) {
		var options = options || {};
		this.options = $.extend(
			$.extend({}, Loader.options),
			options
		);
		this.html = null;
		this.sections = [];
	}

	/**
	 * Default options for {Loader}.
	 *
	 * @property options
	 * @type {Object}
	 * @default
	 */
	Loader.options = {
		'splitTags': ['h1', 'h2', 'h3'],
		'joinHead': false,
	};

	/**
	 * Load html from an url.
	 * Optionally loads the dom into some element.
	 *
	 * @method load
	 * @param {String} url
	 * @param {HTTPElement} into (optional)
	 */
	Loader.prototype.load = function(url, into) {
		var url = url || this.url;
		var into = $(into || 'body');
		return $.get(url, $.proxy(function(data) {
			this.distribute(data);
			this.render(into);
		}, this));
	}

	/**
	 * Distributes the html over sections using
	 * the predefined 'splitTags' config option.
	 *
	 * @method distribute
	 * @param {String} html
	 */
	Loader.prototype.distribute = function(html) {
		this.sections = [];
		var st = this.options['splitTags'].join(',');
		this.html = $(html).filter(':not(#text)');
		var sel = this.html.filter(st);
		if (!(sel.length > 1)) {
			this.sections.push(this.html);
			return;
		}
		var i = 0;
		var start = 0;
		while (start > -1) {
			i = $(sel.filter(':nth-child(' + (i + 1) + ') ~')).index();
			var slice = this.html.slice(start, i != -1 ? i : undefined);
			this.sections.push(slice);
			start = i;
		}
	}

	Loader.prototype.render = function(into) {
		this.cleanup();
		this.sections.forEach(function(el) {
			$('<div class="section">').append(el).appendTo(into);
		});
	}

	Loader.prototype.cleanup = function() {
		$('div.section').remove();
	}

	return {
		'Loader': Loader
	};
});