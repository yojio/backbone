# -*- coding: utf-8 -*-

import webapp2
import json
import models
from google.appengine.ext import ndb


class MemoHandler(webapp2.RequestHandler):


    def get(self,key=None):
        memo = ndb.Key(urlsafe=key).get()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(memo.to_dict()))

    def post(self,key=None):
        data = json.loads(self.request.body)
        memo = models.Memo(**data)
        memo.put()

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(memo.to_dict()))

    def put(self,key=None):
        data = json.loads(self.request.body)
        memo = ndb.Key(urlsafe=key).get()
        memo.content = data["content"]
        memo.put()

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(memo.to_dict()))

    def delete(self,key=None):
        memo = ndb.Key(urlsafe=key).get()
        memo.key.delete()

