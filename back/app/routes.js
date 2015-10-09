var RootRouter = require('express').Router();
var Package = root('package.json');
var Config = root('../config.json');

/**
 * Show some status info
 */
RootRouter.get('/', function(req, res) {
  res.status(200)
  .json({
    status: "working",
    version: Package.version
  });
});



module.exports = RootRouter;