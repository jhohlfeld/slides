(function($) {

        $.ready(function() {

                var hl = ['h1', 'h2', 'h3'];
                var sections = [];
                for (var i = 0; i < hl.length; i++) {
                    var s = $(hl[i]);
                    sections.push({
                            el: s
                        }
                    });

            }
        });
}(jQuery)))