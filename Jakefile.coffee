

desc 'Install back and front dependencies'
task 'install', ->
  jake.exec 'jake api:install && jake app:install', printStdout: true, printStderr: true, complete


namespace 'api', ->
  desc 'Start API in development environment. Auto restart on changes'
  task 'dev', async: true, ->
    jake.exec 'NODE_ENV=development nodemon -e es,js back/server.js', printStdout: true, printStderr: true, complete

  desc 'Start API as daemon in production env'
  task 'start', async: true, ->
    jake.exec 'NODE_ENV=production pm2 start back/server.js --name "internalizer"', printStderr: true, printStdout: true, complete

  desc 'Stop API daemon'
  task 'stop', async: true, ->
    jake.exec 'pm2 stop internalizer && pm2 delete internalizer', printStderr: true, printStdout: true, complete

  desc 'Install backend dependencies'
  task 'install', ->
    jake.exec 'pushd back && npm install && popd', printStderr: true, printStdout: true, complete


namespace 'app', ->
  desc 'Run webpack development server'
  task 'dev', ->
    jake.exec 'pushd front && npm start && popd', printStderr: true, printStdout: true

  desc 'Install frontend dependencies'
  task 'install', ->
    jake.exec 'pushd front && npm install && popd', printStderr: true, printStdout: true, complete