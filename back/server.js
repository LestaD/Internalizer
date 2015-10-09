
var express = require('express');
require('conlog')('Internalizer').disable();
var Internalizer = express();


if (!process.env.PORT) {
  process.env.PORT = 5005;
}

'Start API on Port: %s'.log(process.env.PORT);