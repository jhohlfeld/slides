define(["app", "streamloader"], function(main, streamloader) {

	// FIRST -basic- group
	var loader = new streamloader.Loader();
	loader.load('/base/src/START.html').done(function() {
		//console.log('done');
	});

	describe("The slide loader", function() {

		it("should be an object", function() {
			expect(typeof loader).toBe('object');
		})

		it("should be able to load html", function() {
			expect(loader.html).not.toBe(null);
		});
		it("contains some markup", function() {
			expect(loader.html).toContain("<h1>");
		});

		it("has several sections", function() {
			expect(loader.sections).toBeDefined();
			expect(typeof loader.sections.length).toBe('number');
			expect(loader.sections.length).toBeGreaterThan(0);
		});

		it("has a config option to set the split tag", function() {
			expect(streamloader.Loader.options['splitTagName']).toBeDefined();
		});

	});

	// SECOND group
	var loader2 = new streamloader.Loader({
		splitTagName: 'h2'
	});
	loader2.load('/base/src/START.html');

	// test config option
	describe("The slider's split tag option", function() {

		it("has a default", function() {
			expect(loader.options['splitTagName']).toEqual(
				streamloader.Loader.options['splitTagName']);
		});
		it("can be adjusted per instnce", function() {
			expect(loader.options['splitTagName']).toEqual('h1');
			expect(loader2.options['splitTagName']).toEqual('h2');
		});

		it("number of split tag occurrences matches the number of " +
			"sections in the first group", function() {
				var number = loader.html.match(/h1/g).length / 2;
				expect(loader.sections.length).toEqual(number);
			});
		it("number of split tag occurrences matches the number of " +
			"sections in the second group", function() {
				number = loader2.html.match(/h2/g).length / 2;
				expect(loader2.sections.length).toEqual(number);
			});
	});

	describe("The slider's sections", function() {

		it("concatenated equals the original html", function() {
			var i = 0;
			loader.sections.forEach(function(el) {
				i += el.length;
			})
			expect(i).toEqual($(loader.html).length);
		});
	});

});