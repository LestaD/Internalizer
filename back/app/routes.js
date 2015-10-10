var RootRouter = require('express').Router();
var Package = root('package.json');
var Config = root('../config.json');

var ProjectsRouter = imports('api/projects');

/**
 * Show some status info
 */
RootRouter.get('/', function(req, res) {
  // Test loading anim
  // setTimeout(function(){
    res.status(200)
    .json({
      status: "working",
      version: Package.version
    });
  // }, 1000);
});

RootRouter.use('/projects', ProjectsRouter);

module.exports = RootRouter;