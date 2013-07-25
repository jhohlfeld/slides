var url = '/base/src/START.html';

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
			
			var st, s1, s2;
			
			it("does not split - single delimiter", function() {
				loader.distribute(_html);
				st = loader.options.splitTagName;
				expect(loader.html.filter(st).length).toBe(1);
				expect(loader.sections.length).toBe(1);
			});

			beforeEach(function() {
				loader2.distribute(_html);
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
		describe("sections", function() {

			beforeEach(function(){
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
		describe("views", function() {

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