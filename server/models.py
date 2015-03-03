# -*- coding: utf-8 -*-

from google.appengine.ext import ndb


class Memo(ndb.Model):

    content = ndb.TextProperty()

    def to_dict(self):
        return {
            'key': self.key.urlsafe(),
            'content': self.content,
        }

