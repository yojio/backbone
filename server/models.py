# -*- coding: utf-8 -*-

from google.appengine.ext import ndb


class Memo(ndb.Model):

    title = ndb.TextProperty()
    content = ndb.TextProperty()

    def to_dict(self):
        return {
            'key': self.key.urlsafe(),
            'title': self.title,
            'content': self.content,
        }

