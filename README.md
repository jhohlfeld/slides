slides
======

Very basic slideshow (using markdown, DOM structure to create 'pages').

## Getting started

Slides is a pure javascript application. However, it's required to run it from a server even when on your local machine. 

Slides already brings a simple server written in python, which is capable of translating markdown into html.

    $ npm install
    $ bower install
    $ python ./server/server.py
    $ Listening for request at localhost:5000 ...
    
Now point your browser to the url `http://localhost:5000/src/index.html`.
Obviously, this setup it a bit whacky. But hey, it is just to play around!

Per default, slides requests a file at ./START.md, wich is located at /src/START.md and beeing translated 
on-the-fly to html by the python server.
