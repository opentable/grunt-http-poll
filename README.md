# grunt-http-poll
[![Build Status](https://travis-ci.org/opentable/grunt-http-poll.png?branch=master)](https://travis-ci.org/opentable/grunt-http-poll) [![NPM version](https://badge.fury.io/js/grunt-http-poll.png)](http://badge.fury.io/js/grunt-http-poll) ![Dependencies](https://david-dm.org/opentable/grunt-http-poll.png)

Poll a http endpoint until you see the desired statuscode.

In our case we use it after issuing the stop command to keep polling until we see the server has stopped.

installation:

```npm install --save grunt-http-poll```

usage:

```
grunt.initConfig({
  'http-poll':{
    options: {
      endpoint: 'http://myserver.com/someendpoint',
      statuscode: 502, // desired status code
      pollinterval: 1000, // time between requests
      timeout: 60000 // if no change seen by the timeout then throw an exception
      timeoutIsError: false // treat the timeout elapse as an error (fail) or not (continue), default: true
    }
  }
});

```
