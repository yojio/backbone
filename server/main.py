# -*- coding: utf-8 -*-

import webapp2
import memo

class MainPage(webapp2.RequestHandler):


    def get(self):
        self.response.write("test")


app = webapp2.WSGIApplication([
            webapp2.Route(r'/memo', memo.MemoHandler),
            webapp2.Route(r'/memo/<key>', memo.MemoHandler),
            webapp2.Route(r'/', MainPage)
       ],
       debug = True)