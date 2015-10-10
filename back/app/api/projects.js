var ProjectsRouter = require('express').Router();


/**
 * Get list of all projects
 */
ProjectsRouter.get('/', function(req, res){
  res.status(200)
  res.json({
    projects: [
    ]
  }).end();
});



module.exports = ProjectsRouter;