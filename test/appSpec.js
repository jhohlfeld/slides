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
	});
});