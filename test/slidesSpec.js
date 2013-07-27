define(["streamloader", "text!/base/src/START.html"], function(streamloader, _html) {

	// FIRST -basic- group
	var loader = new streamloader.Loader();

	/**
	 * Describe the loader
	 *
	 */
	describe("The slide loader", function() {

		it("should be an object", function() {
			expect(typeof loader).toBe('object');
		})

		it("has a method distribute", function() {
			expect(typeof loader.distribute).toBe("function");
		});

		it("has sections", function() {
			expect(loader.sections).toBeDefined();
			expect(typeof loader.sections.length).toBe('number');
		});

		describe("has a config option to set the split tag", function() {
			it("and it's an array", function() {
				expect(streamloader.Loader.options['splitTags']).toBeDefined();
				expect(streamloader.Loader.options['splitTags'] instanceof Array).toBe(true);
			});
		});

		it("has a config option to set the splitting method", function() {
			expect(streamloader.Loader.options['joinHead']).toBeDefined();
		});

		/**
		 * Split tag option
		 *
		 */

		// SECOND group
		var loader2 = new streamloader.Loader({
			splitTags: ['h2']
		});

		// test config option
		describe("split tag option", function() {

			it("has a default", function() {
				expect(loader.options['splitTags']).toEqual(
					streamloader.Loader.options['splitTags']);
			});
			it("can be adjusted per instance", function() {
				expect(loader.options['splitTags']).toEqual(['h1', 'h2', 'h3']);
				expect(loader2.options['splitTags']).toEqual(['h2']);
			});
		});

		/**
		 * Split function
		 *
		 */
		describe("distribute method", function() {

			var st, s1, s2;
			var loader3 = new streamloader.Loader();

			it("does not split - single delimiter", function() {
				loader.options.splitTags = ['h1'];
				loader.distribute(_html);
				st = loader.options.splitTags.join(',');
				expect(loader.html.filter(st).length).toBe(1);
				expect(loader.sections.length).toBe(1);
			});

			beforeEach(function() {
				loader.options.splitTags = ['h2'];
				st = loader.options.splitTags.join(',');
				loader.distribute(_html);
				s1 = loader.sections[0];
				s2 = loader.sections[1];
				s3 = loader.sections[2];
			});

			it("does split - two delimiters", function() {
				expect(loader.html.filter(st).length).toBe(2);
				expect(loader.sections.length).toEqual(
					$(_html).filter(st).length + 1);

				// individual length of each section
				expect(s1.length).toEqual(1);
				expect(s2.length).toEqual(8);
				expect(s3.length).toBe(loader.html.length 
					- s1.length - s2.length);
			});

			it("creates sections with distinct headlines", function() {
				expect(s1.text()).toEqual(
					loader.html.filter(':eq(0)').text());
				expect(s2.filter(st).text()).toEqual(
					loader.html.filter(st + ':eq(0)').text());
				expect(s3.filter(st).text()).toEqual(
					loader.html.filter(st + ':eq(1)').text());
			});

			it("can create a number of sections", function() {
				// re-set to original ['h1', 'h2', 'h3']
				loader.options.splitTags = streamloader.Loader.options.splitTags;
				loader.distribute(_html);
				expect(loader.sections.length).toBeGreaterThan(3);
				st = loader.options.splitTags.join(',');
				expect($(_html).filter(st).length).toEqual(loader.sections.length);
			});
		});

		/**
		 * The sections
		 *
		 */
		xdescribe("sections", function() {

			beforeEach(function() {
				loader2.distribute(_html);
			});

			it("are singular", function() {
				expect($(loader2.sections[0]).filter('h2').length).toEqual(1);
			});

			it("are unique", function() {
				var f = function() {
					return this.outerHTML;
				}
				expect(loader2.sections[0].map(f)).
				not.toEqual(loader2.sections[1].map(f));
			});
		});

		/**
		 * The views are created
		 *
		 */
		xdescribe("views", function() {

			beforeEach(function() {
				loader2.distribute(_html);
				loader2.render($('body'));
			});

			it("should have been generated.", function() {
				expect($('div.section').length).toBe(2);
			});
		});

	});

});