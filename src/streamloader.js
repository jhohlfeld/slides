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
		var into = $(into || 'body');
		return $.get(url, $.proxy(function(data) {
			this.html = $(data).filter(':not(#text)');
			this.distribute(this.html);
			this.render(into);
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
		this.sections = [];
		var st = this.options['splitTagName'];
		var html = $(html).filter(':not(#text)');
		var sel = html.filter(st);
		if (!(sel.length > 1)) {
			this.sections.push(html);
			return;
		}
		var i = $(sel[1]).index();
		var start = 0;
		while (i > 0) {
			this.sections.push(html.slice(start, i));
			start = i;
			i = $(sel.filter(':gt(' + i + ')')).index();
			if (i < 0) {
				this.sections.push(html.slice(start));
			}
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

	/**
	 * jQuery plugin _outerHtml_
	 *
	 * @example
	 *     $(el).outerHtml()
	 *
	 */
	$.fn.outerHtml = function() {
		var s = '';
		this.each(function(el) {
			s += el.outerHTML;
		});
		return s;
	};

	return {
		'Loader': Loader
	};
});