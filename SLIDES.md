# Barcamp Slides

0. Motivation
0. Design is everywhere
0. General Idea of the _real time web_

## General Idea of the _real time web_

_Make easy introduction for non-technical people_

As we take the internet anywhere we go - demand arises of highly responsive, interconnected applications.

### General Idea - The request-response cycle

Communication via the net has been on a request-response basis.

+ Request-response cycle
+ client sends requests
+ server responses with some data
+ initiator always the client

### General Idea - New need arises

+ multiple applications and devices need to access same pool of data
+ example: 

	client(smarphone) shoots a photo
	uploads to dropbox
	othe client - the pc - registers change, downloads the picture in the same moment (or later)
	any client will get updates automatically

### General Idea - The situation changes

Time is the key

+ request-response cycle is slow
+ updates need to work instantanious
+ to the client, at least the _impression of instanceness_ is a matter of good design

### General Idea - The path is clear

+ need to _push_ data to the client
+ the server (or any application) may become the initiator

### General Idea - New tech on the rise

+ websockets are much faster
+ the wire is always open
+ permanent connection

