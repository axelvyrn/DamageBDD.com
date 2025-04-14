#!/bin/sh
emacs -Q --fg-daemon -l publish.el --eval "(publish-and-serve)"
