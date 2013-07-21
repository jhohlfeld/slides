define(["app", "streamloader"], function(main, Loader) {

	describe("The loader", function() {

		var loader = new Loader();
		loader.load('/base/src/START.html').done(function() {
			//console.log('done');
		});
		it("should be an object", function() {
			expect(typeof loader).toBe('object');
		})

		it("should be able to load html", function() {
			expect(loader.html).not.toBe(null);
		});
		it("contains some markup", function(){
			expect(loader.html).toContain("<h1>");
		});

		it("has several sections", function() {
			expect(loader.sections).toBeDefined();
			expect(typeof loader.sections.length).toBe('number');
			expect(loader.sections.length).toBeGreaterThan(0);
		});

		it("has a config option to set the split tag", function () {
			expect(Loader.options['splitTagName']).toBeDefined();
		});

		var loader2 = new Loader({splitTagName:'h2'});
		loader2.load('/base/src/START.html');
		
		it("split tag can be set", function () {
			expect(loader2.options['splitTagName']).toEqual('h2');
		});
		it("number of sections equals split tag occurrences", function () {
			var number = loader.html.match(/h1/g).length/2;
			expect(loader.sections.length).toEqual(number);
		});
	});

});
