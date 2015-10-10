
require('./app/utils/imports')(__dirname);
var express = require('express');
var routes = imports('routes');
var allowCrossdomain = imports('utils/common').allowCrossdomain;
var config = require('../config.json');

require('conlog')('Internalizer').disable();
var Internalizer = express();
var PORT = 5005;

if (process.env.PORT) {
  PORT = process.env.PORT;
}
else if(config.api && config.api.port) {
  PORT = config.api.port;
}

Internalizer.use(allowCrossdomain);
Internalizer.use('/v0', routes);

// Show 400 Bad Request
Internalizer.all('*', function(req, res) {
  res.status(400).json({
    error: "Undefined resource"
  }).end();
});

var Server = Internalizer.listen(PORT, function() {
  'Internalizer API listening at %s port'.info(Server.address().port);
});
