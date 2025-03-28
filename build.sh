#!/bin/sh
emacs --batch \
      -l ~/Org/damagebdd/publish.el \
      --eval "(org-publish-project \"damagebdd\" t)"
