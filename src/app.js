/**
 * The application module.
 * 
 * In here you find all high-level api methods
 * that drive the application.
 * 
 * @module app
 */
define(["hbs!tpl/viewer", "streamloader", "jquery"], function(_viewer, streamloader, $) {

	var Slides, Page;

	/**
	 * Slides application.
	 *
	 * This type brings all functionality that is needed
	 * for a fully working slides application. It houses
	 * any component handling as well as loading, displaying
	 * and destoying/restoring methods for the view-end.
	 *
	 * @class app.Slides
	 * @constructor
	 * 
	 * @param {Object} options
	 */
	Slides = function(options) {
		this.options = $.extend({}, Slides.options);
		this.loader = new streamloader.Loader();
		this.container = null;
		this.pages = [];
		this.currentPage = 0;

		$(document).on('keyup', $.proxy(this.keyListener, this));
		$(window).on('resize', $.proxy(this.resizeListener, this));
	}

	/**
	 * Standard options.
	 * 
	 * @property options
	 * @type object
	 */
	Slides.options = {
		"container": '<div id="slides-app">',
		"attachTo": 'body'
	};

	/**
	 * Loads a new slide object from an url.
	 * 
	 * The url is expected top point to some structured
	 * - html - resource.
	 * 
	 * @method loadSlide
	 * @param {String} url
	 */
	Slides.prototype.loadSlide = function(url) {
		var into = this.container = $(this.options['container']);
		var prom = this.loader.load(url, into);
		prom.done($.proxy(function() {
			into.children().hide().first().show();
			into.appendTo(this.options['attachTo']);
			this.resizeListener(null);
			into.children().each($.proxy(function(i, el) {
				this.pages.push(new Page(el));
			}, this));
		}, this));
		return prom;
	}

	Slides.prototype.getPages = function() {
		return this.pages;
	}

	Slides.prototype.gotoPage = function(page) {
		// transition?
		if (0 <= page && page < this.getPages().length) {
			this.getPages()[this.currentPage].hide();
			this.getPages()[page].show();
			this.currentPage = page;
		}
	}

	Slides.prototype.gotoNextPage = function() {
		// body...
		if (this.currentPage < this.getPages().length - 1) {
			this.getPages()[this.currentPage + 1].show();
			this.getPages()[this.currentPage].hide();
			this.currentPage++;
		}
	};

	Slides.prototype.gotoPreviousPage = function() {
		// body...
		if (this.currentPage > 0) {
			this.getPages()[this.currentPage].hide();
			this.getPages()[this.currentPage - 1].show();
			this.currentPage--;
		}
	};

	Slides.prototype.gotoFirstPage = function() {
		// body...
		var pages = this.getPages();
		if (this.currentPage != 0) {
			pages[this.currentPage].hide();
			pages[0].show();
			this.currentPage = 0;
		}
	};

	Slides.prototype.gotoLastPage = function() {
		// body...
		var pages = this.getPages();
		if (this.currentPage != pages.length - 1) {
			pages[this.currentPage].hide();
			var goto = pages.length - 1;
			pages[goto].show();
			this.currentPage = goto;
		}
	};

	/**
	 * 
	 * @method keyListener
	 */
	Slides.prototype.keyListener = function(e) {
		// pgup, left or up
		if ([33, 37, 38].indexOf(e.which) != -1) {
			this.gotoPreviousPage();
		}

		// pgdown, right or down
		if ([34, 39, 40].indexOf(e.which) != -1) {
			this.gotoNextPage();
		}

		//pos1
		if ([36].indexOf(e.which) != -1) {
			this.gotoFirstPage();
		}

		//end
		if ([35].indexOf(e.which) != -1) {
			this.gotoLastPage();
		}

		// numbers
		if(48 <= e.which && e.which <= 57) {
			var num = parseInt(String.fromCharCode(e.which));
			if(this.keyInterval) {
				clearInterval(this.keyInterval);
				this._nextPage = parseInt(""+this._nextPage + num);
			} else {
				this._nextPage = num;
			}
			this.keyInterval = setTimeout($.proxy(function() {
				var page = this._nextPage -1;
				this._nextPage = 0;
				this.gotoPage(page >= 0 ? page : 0);
			}, this), 300);
		}
	}

	/**
	 * Listener.
	 * 
	 * Listenss for the resizing of the window object.
	 * 
	 * @method resizeListener
	 */
	Slides.prototype.resizeListener = function(e) {
		var c = this.container;
		var wMargin = c.outerWidth(true) - c.outerWidth(false);
		var hMargin = c.outerHeight(true) - c.outerHeight(false);
		var p = this.container.parent();
		this.container.width(p.width() - wMargin);
		this.container.height(p.height() - hMargin);
	}

	/**
	 *
	 * @class app.Page
	 * @constructor
	 */
	Page = function(el) {
		this.el = el;
	}

	Page.prototype.show = function() {
		$(this.el).show();
	}


	Page.prototype.hide = function() {
		$(this.el).hide();
	}

	return {
		"Slides": Slides,
		"Page": Page
	}
});