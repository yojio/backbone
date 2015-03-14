# -*- coding: utf-8 -*-

import json

from google.appengine.ext import ndb
import webapp2


import models

class MemoHandler(webapp2.RequestHandler):


    def get(self, key = None):

        if key:
            memo = ndb.Key(urlsafe = key).get()
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(memo.to_dict()))
        else:
            memos = models.Memo.query().order(models.Memo.key)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps([memo.to_dict() for memo in memos]))

    def post(self, key = None):
        data = json.loads(self.request.body)
        memo = models.Memo(**data)
        memo.put()

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(memo.to_dict()))

    def put(self, key = None):
        data = json.loads(self.request.body)
        memo = ndb.Key(urlsafe = key).get()
        memo.content = data["content"]
        memo.put()

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(memo.to_dict()))

    def delete(self, key = None):
        memo = ndb.Key(urlsafe = key).get()
        memo.key.delete()

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(memo.to_dict()))
