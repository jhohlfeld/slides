//streamloader.js

/**
 * The streamloader object returns a pormise
 * with an html string loaded via ajax.
 * 
 * Use it's load() method to get started.
 */
define(['jquery'], function($) {

	var Loader = function(options) {
		var options = options || {};
		this.options = $.extend(this.constructor.options, options);
		this.html = null;
		this.sections = [];
	}

	Loader.options = {
		'splitTagName' : 'h1'
	};

	Loader.prototype.load = function(url, into) {
		var url = url || this.url;
		var a = arguments;
		return $.get(url, $.proxy(function(data) {
			this.html = data;
			if(a.length == 2) {
				into.html(this.html);
			}
			this.splitSections(this.html);
		}, this));
	}

	Loader.prototype.splitSections = function(dom) {
		var sections = [];
		$.each($(dom).filter('h1'), function(i, el) {
			var cnt = [el];
			for(var i=0, els = $(el).siblings(); i<els.length; i++) {
				if(els[i].nodeName == 'h1') {
					break;
				}
				cnt.push(els[i]);
			}
			sections.push(cnt);
		});
		this.sections = sections;
	}

	return Loader;
});
