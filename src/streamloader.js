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
		'splitTagName': 'h1'
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
		var a = arguments;
		return $.get(url, $.proxy(function(data) {
			this.html = data;
			if (a.length == 2) {
				into.html(this.html);
			}
			this.distribute(this.html);
		}, this));
	}

	/**
	 * Distributes the html over sections using
	 * the predefined 'splitTagName' config option.
	 *
	 * @method distribute
	 * @param {String} html
	 */
	Loader.prototype.distribute = function(html) {
		var sections = [];
		var st = this.options['splitTagName'];
		$(html).filter(st).each(function(i, el) {
			var cnt = [el];
			while (null != (el = el.nextSibling)) {
				if (el.nodeName == st) {
					break;
				}
				cnt.push(el);
			}
			sections.push(cnt);
		});
		this.sections = sections;
	}

	return {
		'Loader': Loader
	};
});