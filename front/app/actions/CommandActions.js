import Tree from 'db/tree';


export function TextLog(lines = []) {
  if (typeof lines === 'string') lines = [lines];
  if (!Array.isArray(lines)) throw new TypeError('lines must be Array');
  LogCommand(null, null, null, null, lines);
}

export function LogCommand(command, directory, user, host, log = []) {
  Tree.select('history').push({
    command,
    directory,
    user,
    host,
    log
  });

  if (command) {
    Tree.select('cmdHistory').push(command);
  }
};


export function FlushHistory() {
  Tree.select('history').set([]);
}

export function FlushCmdHistory() {
  Tree.select('cmdHistory').set([]);
}


export function SetExecuting(command, directory, user, host) {
  Tree.select('executing').set({
    command,
    directory,
    user,
    host,
    log: []
  });
};


export function finishExecuting() {
  let cmd = Tree.get('executing');
  LogCommand(cmd.command, cmd.directory, cmd.user, cmd.host, cmd.log);
  Tree.select('executing').set(false);
};


export function addExecutingLog(...lines) {
  let lg = Tree.select('executing').get();
  Tree.select('executing').set('log', lg.log.concat(lines));
};


export function getCommand(command) {
  return Tree.select('commands').get(command);
}


export function getCommands() {
  return Tree.select('commands').get();
}
