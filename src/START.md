# SLIDES - simple javascript slide application

Slides takes an html document and breaks it apart using html headline tags (`h1, h2, ...`) as demarcation.

This behaviour is configurable - `h1` through to `h3` are the defaults.

In fact, any tag may be used to slice the original document up!

#### Usage

You can use the following keys to navigate the document: 

`up`, `down`, `left` `right` as well as `pgup` and `pgdown` to traverse page by page,

`pos1` to return to the beginning, `end` to jump to the end

and finally numbers `0..9` to jump directly to a certain page.

## A test bed for a new technology stack

Slides was created as a pet project, accompanying preparations for a one-day barcamp in Leipzig which took place earlier this year.

It was used to test some really cool tech - beeing [karma][i0], [bower][i1], [markdown][i3] and [jasmine][i4].

## What follows

... are some of the contents, which we talked about at the barcamp.

## Tools & Methoden

+ [Reactive programming][1] Paradigm
+ [PubSub][2] Design Pattern
+ [Websocket][3] Protocol
* [Web Socket Application Protocol (WAMP)][4]
	<br>PubSub with [RCP][5] over WebSocket

_Other interesting paradigms_

+ continuation passing style (callbacks)
+ vs. _'[promises][12]'_, which are:
> an object that has a function as the value for the property then

### Libraries / APIs

+ (Python) Web framework [Twisted][6]
+ (Python) Networking library [Autobahn][7]
+ (Python) Web framework [Tornado][11]

### Tools

+ __Sublime Text 2__ - Makes coding fun. A python-powered, extremely stylish, powerful yet lightweight text editor. 
	<br>[Sublime website][9]
+ __Markdown__ - Syntax zum einfachen Erzeugen von HTML-Dokumenten aus normalem Text [Markdown Syntax Reference][8]

## Key aspects

_Realtime_

1. Data on the wire
2. Latency Compensation
3. Reactivity

_That means_

+ Continually updated data streams
+ Combination of PubSub & Remote Procedure Calls
+ Automagically rendered view templates (on the client)

_Possible issues_

* EJSON format of meteor -> how does it correspond to mogodb's [BSON][10]?

* remote procedure calls (how's the java interface prepared for that)

[1]: http://en.wikipedia.org/wiki/Reactive_programming
[2]: http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern
[3]: http://tools.ietf.org/html/rfc6455
[4]: http://wamp.ws/
[5]: http://de.wikipedia.org/wiki/Remote_Procedure_Call 
[6]: http://twistedmatrix.com/
[7]: http://autobahn.ws/python
[8]: http://markdown.de/syntax/
[9]: http://www.sublimetext.com/
[10]: http://docs.mongodb.org/manual/core/document/
[11]: http://www.tornadoweb.org/
[12]: http://wiki.commonjs.org/wiki/Promises/A

[i0]: http://karma-runner.github.io/0.10/index.html
[i1]: http://bower.io/
[i2]: http://markdown.de/syntax/
[i3]: http://pivotal.github.io/jasmine/
