define(["app"], function(main) {

	describe("A module", function() {
		it("has a greeting", function(){
			expect(main).toEqual("Hallo Welt!");
		});
	});
});
