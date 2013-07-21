var tests = Object.keys(window.__karma__.files).filter(function (file) {
      return /Spec\.js$/.test(file);
});

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    paths: {
    	'jquery': '../bower_components/jquery/jquery.min',
    	'handlebars': '../bower_components/handlebars/handlebars',
    	'hbs' : '../bower_components/requirejs-hbs/hbs',
    	'text' : '../bower_components/requirejs-text/text',
    },
  // hbs config
  hbs: {
    templateExtension: ".html", // Set the extension automatically appended to templates
                              // ('hbs' by default)
  },

  shim: {
  	'handlebars': {
  		exports: 'Handlebars'
  	},
//        'underscore': {
//            exports: '_'
//        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});