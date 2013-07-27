define(["hbs!tpl/viewer", "streamloader", "jquery"], function(_viewer, streamloader, $) {

	var Slides;

	Slides = function(options) {
		this.options = $.extend({}, Slides.options);
		this.loader = new streamloader.Loader();
	}

	Slides.options = {
		"container": '<div id="slides-app">',
		"attachTo": 'body'
	};

	Slides.prototype.loadSlide = function(url) {
		var into = $(this.options['container']);
		var prom = this.loader.load(url, into);
		prom.done($.proxy(function() {
			into.children().hide().first().show();
			into.appendTo(this.options['attachTo']);
		}, this));
		return prom;
	}

	return {
		"Slides": Slides
	}
});