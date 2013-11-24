slides
======

Very basic slideshow (using markdown, DOM structure to create 'pages').

## Getting started

Slides is a pure javascript application. However, you are required to run it from a server even when on your local machine. 

Slides already brings a simple server written in python, which is capable of translating markdown into html.

    $ npm install
    $ bower install
    $ python ./server/server.py
    $ Listening for request at localhost:5000 ...
    
Now point your browser to the url `http://localhost:5000/src/index.html`.
Obviously, this setup it a bit whacky. But hey, it's meant for playing around!

Per default, slides will request a file at `./START.md`, wich is located at `/src/START.de` and beeing translated into html on-the-fly by the server.
