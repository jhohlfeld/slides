define(["jquery", "jquery-mockjax", "app", "streamloader", "text!START.html"], function($, _, app, streamloader, _html) {

	var slides = new app.Slides();
	var url = "http://html-fake";
	$.mockjax({
		"url": url,
		"contentType": 'text/plain',
		"responseText": _html,
		"responseTime": 1,
		"logging": false
	});

	describe("The slider app", function() {

		var id, container;

		beforeEach(function() {
			if (container) {
				container.remove();
			}
			jasmine.Clock.useMock();
			var p = slides.loadSlide(url);
			p.done(function(h) {
				// console.log("Called load(): " + h.substr(0, 100) + "...");
			});
			jasmine.Clock.tick(2);
			id = $(slides.options['container']).attr('id');
			container = $('#' + id);
		});

		it("owns a reference to a loader", function() {
			expect(slides.loader instanceof streamloader.Loader).toBe(true);
		});

		it("has attached a container with slider section elements", function() {
			expect(id).toBeDefined();
			expect(container[0]).toBeDefined();
			expect(container.children().length).toEqual(slides.loader.sections.length);
		});

		it("has a certain amount of pages", function() {
			expect(slides.getPages).toBeDefined();
			expect(slides.getPages().length).toBeGreaterThan(0);
			expect(slides.getPages()[0]).toBeDefined();
			expect(slides.getPages()[0] instanceof app.Page).toEqual(true);
		});

		it("has api methods for selecting a page", function() {
			expect(slides.gotoPage).toBeDefined();
		});

		it("has api methods for selecting the next page", function() {
			expect(slides.gotoNextPage).toBeDefined();
		});

		it("has api methods for selecting the previous page", function() {
			expect(slides.gotoPreviousPage).toBeDefined();
		});

		it("has api methods to jump to the first page", function() {
			expect(slides.gotoFirstPage).toBeDefined();
		});

		it("has api methods to jump to the last page", function() {
			expect(slides.gotoLastPage).toBeDefined();
		});
	});

	describe("A page", function() {

		var container, page;

		beforeEach(function() {
			if (container) {
				container.remove();
			}
			jasmine.Clock.useMock();
			slides.loadSlide(url);
			jasmine.Clock.tick(2);
			var id = $(slides.options['container']).attr('id');
			container = $('#' + id);
			page = slides.getPages()[0];
		});

		it("is of type 'object' or 'app.Page'", function() {
			expect(typeof page).toBe('object');
			expect(page instanceof app.Page).toBe(true);
		});

		it("has functions to show and hide.", function() {
			expect(typeof page.show).toBe('function');
			expect(typeof page.hide).toBe('function');
		});
	});

});