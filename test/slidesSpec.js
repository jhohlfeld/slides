define(["app", "streamloader"], function(main, streamloader) {

	// FIRST -basic- group
	var loader = new streamloader.Loader();
	loader.load('/base/src/START.html').done(function() {
		//console.log('done');
	});

	/**
	 * Describe the loader
	 *
	 */
	describe("The slide loader", function() {

		it("should be an object", function() {
			expect(typeof loader).toBe('object');
		})

		it("should be able to load html", function() {
			expect(loader.html).not.toBe(null);
		});
		it("contains some markup", function() {
			expect(loader.html.filter('h1').length).toBe(1);
		});

		it("has several sections", function() {
			expect(loader.sections).toBeDefined();
			expect(typeof loader.sections.length).toBe('number');
			expect(loader.sections.length).toBeGreaterThan(0);
		});

		it("has a config option to set the split tag", function() {
			expect(streamloader.Loader.options['splitTagName']).toBeDefined();
		});

		/**
		 * Split tag option
		 *
		 */

		// SECOND group
		var loader2 = new streamloader.Loader({
			splitTagName: 'h2'
		});
		loader2.load('/base/src/START.html');

		// test config option
		describe("split tag option", function() {

			it("has a default", function() {
				expect(loader.options['splitTagName']).toEqual(
					streamloader.Loader.options['splitTagName']);
			});
			it("can be adjusted per instance", function() {
				expect(loader.options['splitTagName']).toEqual('h1');
				expect(loader2.options['splitTagName']).toEqual('h2');
			});
		});

		/**
		 * Split function
		 *
		 */
		describe("distribute method", function() {

			it("does not split - single delimiter", function() {
				var st = loader.options.splitTagName;
				expect(loader.html.filter(st).length).toBe(1);
				expect(loader.sections.length).toBe(1);
			});

			var st, s1, s2;
			beforeEach(function() {
				st = loader2.options.splitTagName;
				s1 = loader2.sections[0];
				s2 = loader2.sections[1];
			});

			it("does split - two delimiters", function() {
				expect(loader2.html.filter(st).length).toBe(2);
				expect(loader2.sections.length).toBe(2);
				expect(s1.length).toBeGreaterThan(0);
				expect(s2.length).toBe(loader2.html.length - s1.length);
			});

			it("creates sections with distinct headlines", function() {
				expect(s1.filter(st).text()).toEqual(
					loader2.html.filter(st + ':eq(0)').text());
				expect(s2.filter(st).text()).toEqual(
					loader2.html.filter(st + ':eq(1)').text());
			});
		});

		/**
		 * The sections
		 *
		 */
		xdescribe("sections", function() {

			it("do expose a function `outerHtml()`", function() {
				var f = loader2.sections[0].outerHtml;
				expect(f).toBeDefined();
				expect(typeof f).toBe('function');
			});

			it("are singular", function() {
				expect($(loader2.sections[0]).filter('h2').length).toEqual(1);
			});

			it("are unique", function() {
				expect(loader2.sections[0].outerHtml()).
				not.toEqual(loader2.sections[1].outerHtml());
			});
		});

		/**
		 * The views are created
		 *
		 */
		describe("The slide loader", function() {

			it("should be able to generate a number of views.", function() {
				expect($('div.section')[0]).toBeDefined();
			});
		});

	});

});