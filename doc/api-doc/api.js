YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "app.Page",
        "app.Slides",
        "streamloader.Loader"
    ],
    "modules": [
        "app",
        "streamloader"
    ],
    "allModules": [
        {
            "displayName": "app",
            "name": "app",
            "description": "The application module.\n\nIn here you find all high-level api methods\nthat drive the application."
        },
        {
            "displayName": "streamloader",
            "name": "streamloader",
            "description": "The streamloader object takes care of loading an html\ninto a stream (string object) and at the same time\ndistributes this stream as a number of sections.\n\nThe streamloader object returns a pormise\nwith an html string loaded via ajax.\n\nUse it's load() method to get started."
        }
    ]
} };
});