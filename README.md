# node-rest-client-promise

[![Travis](https://img.shields.io/travis/dodevops/node-rest-client-promise.svg)](https://travis-ci.org/dodevops/node-rest-client-promise)

node-rest-client, but with promises

## Introduction

I found this question and answer on StackOverflow about promisifying
the node-rest-client module:

http://stackoverflow.com/questions/30112657/how-to-use-bluebird-to-promisify-node-rest-client

However, it seems the original author didn't share a node module
for this, so I did that. Additionally, I had to fix a few small things
and document it.

This module provides a promisifed version of the
[node-rest-client](https://www.npmjs.com/package/node-rest-client).

## Usage

This module provides this small function:
  * client(options): Call `new Client(options)`, promisify and return it

The promisified client methods will have a "Promise" suffix:

```javascript
var client = require('node-rest-client-promise').Client(options);

client.getPromise(url).catch(...).then(...)
```

Please note, that the resolved callback of the Promise will be called
with one argument to comply with Promise style. This argument will
be an object with the keys 'data' and 'response' reflecting the original
arguments of e.g. `client.get()`.

For details about node-rest-client, please see the
[original documentation](https://www.npmjs.com/package/node-rest-client)

## Usage of registerMethod

Node Rest Client's method "registerMethod" is available as registerMethodPromise from Version 3.1.0 on.
