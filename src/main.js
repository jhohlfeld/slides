requirejs.config({
  baseUrl: '/src',

  paths: {
    'jquery': '../bower_components/jquery/jquery.min',
    'handlebars': '../bower_components/handlebars/handlebars',
    'hbs': '../bower_components/requirejs-hbs/hbs',
    'text': '../bower_components/requirejs-text/text',
  },
  // hbs config
  hbs: {
    templateExtension: ".html",
    // Set the extension automatically appended to templates
    // ('hbs' by default)
  },

  shim: {
    'handlebars': {
      exports: 'Handlebars'
    },
  },
});

require(['jquery', 'app'], function($, view) {

  $('body').append(view);

});