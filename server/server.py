###############################################################################
##
##  Copyright 2012 Tavendo GmbH
##
##  Licensed under the Apache License, Version 2.0 (the "License");
##  you may not use this file except in compliance with the License.
##  You may obtain a copy of the License at
##
##      http://www.apache.org/licenses/LICENSE-2.0
##
##  Unless required by applicable law or agreed to in writing, software
##  distributed under the License is distributed on an "AS IS" BASIS,
##  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
##  See the License for the specific language governing permissions and
##  limitations under the License.
##
###############################################################################

import uuid, sys, os, mimetypes, codecs, markdown

from twisted.python import log
from twisted.internet import reactor
from twisted.web.server import Site
from twisted.web.wsgi import WSGIResource

from flask import Flask, render_template

from autobahn.websocket import WebSocketServerFactory, \
                               WebSocketServerProtocol

from autobahn.resource import WebSocketResource, \
                              WSGIRootResource, \
                              HTTPChannelHixie76Aware

from exceptions import IOError

mimetypes.init();

##
## Our WebSocket Server protocol
##
class EchoServerProtocol(WebSocketServerProtocol):

   def onMessage(self, msg, binary):
      self.sendMessage(msg, binary)


##
## Our WSGI application
##
def app(environ, start_response):
    """Simplest possible application object

    Just serving static files...

    And handling some markdown-files (.md)
    """

    method = environ.get('REQUEST_METHOD')
    data = ''
    ctype = 'text/plain'
    encoding = 'None'
    code = '200'
    
    # determine resource location
    path = environ.get('PATH_INFO', '').lstrip('/')
    resource = os.path.join(os.getcwd(), path)
    print '%s %s' % (method, resource)

    # try to open the resource
    try:

      # handle markdown (.md)
      if resource.endswith('.md'):
         data = read_markdown(resource)

      # handle all other files
      else:
         with open(resource, 'r') as r:
            data = r.read();
         r.closed

      code = '200'

      # guess the content type and encoding
      (ctype, encoding) = mimetypes.guess_type(resource)

    except IOError as e:

      # handle 404 and 505 error
      if e.errno == 2:
         code = '404'
      else:
         code = '505'
      ctype = 'text/html'
      data = '<html><body><h1>%s</h1></body></html>' % status(code)

    print '%s %s' % (code, resource)

    # set response headers
    response_headers = [
        ('Content-Type', ctype),
        ('Content-Encoding', encoding),
        ('Content-Length', str(len(data)))
    ]
    start_response(status(code), response_headers)
    return iter([data])


def status(code):
   """Gets a proper http status
   """
   status_codes = dict([
     ('200', 'OK'),
     ('404', 'Not Found'),
     ('505', 'Internal Server Error')
   ])
   return '%s %s' % (code, status_codes[code])


def read_markdown(resource, encoding='utf-8'):
   """ Returns html generated from markdown source.
   """
   md = ''
   with codecs.open(resource, mode='r', encoding=encoding) as f:
      md = f.read()
   f.closed
   return markdown.markdown(md).encode('utf-8')


if __name__ == "__main__":

   if len(sys.argv) > 1 and sys.argv[1] == 'debug':
      log.startLogging(sys.stdout)
      debug = True
   else:
      debug = False

   app.debug = debug
   if debug:
      log.startLogging(sys.stdout)
   
   ##
   ## create a Twisted Web resource for our WebSocket server
   ##
   wsFactory = WebSocketServerFactory("ws://localhost:8080",
                                      debug = debug,
                                      debugCodePaths = debug)

   wsFactory.protocol = EchoServerProtocol
   wsFactory.setProtocolOptions(allowHixie76 = True) # needed if Hixie76 is to be supported

   wsResource = WebSocketResource(wsFactory)

   ##
   ## create a Twisted Web WSGI resource for our Flask server
   ##
   wsgiResource = WSGIResource(reactor, reactor.getThreadPool(), app)
   
   ##
   ## create a root resource serving everything via WSGI/Flask, but
   ## the path "/ws" served by our WebSocket stuff
   ##
   rootResource = WSGIRootResource(wsgiResource, {'ws': wsResource})
   
   ##
   ## create a Twisted Web Site and run everything
   ##
   site = Site(rootResource)
   site.protocol = HTTPChannelHixie76Aware # needed if Hixie76 is to be supported

   reactor.listenTCP(5000, site)
   reactor.run()
