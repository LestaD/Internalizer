
import Tree from 'db/tree';
import { finishExecuting, addExecutingLog, FlushHistory } from 'actions/CommandActions';


class CommandMaker {

  /**
   * @param  {String} cmd
   */
  constructor(cmd) {
    this.command = cmd;
    this._descr = [];
    this._run = [];
  }

  set description(value) {
    if (typeof value === 'string') value = [value];
    if (!Array.isArray(value)) throw new TypeError('Description of command must be Array of text lines');

    this._descr = value;
  }

  get description() {
    return this._descr;
  }


  /**
   * Add callback to command execute
   * @param  {Function} cb When command was executed
   */
  onRun(cb) {
    this._run = cb;
  }

  /**
   * Save command to db
   */
  save() {
    Tree.select('commands').set(this.command, {
      description: this._descr,
      options: this._opts,
      listenRun: this._run
    });
  }

}


export default class Command {

  /**
   * @param {String} command
   * @param {String} description
   * @param {Function} maker
   */
  static Make(command, maker) {
    let cmk = new CommandMaker(command);
    maker.bind(cmk)();
    cmk.save();
    return cmk;
  }

  /**
   * @param  {Object} commandHash
   */
  constructor(command, commandHash) {
    this.command = command;
    this.hash = commandHash;
    this.listenData = null;
    this.finishData = null;
    this.errorListen = null;

    this.print = function(text) {
      addExecutingLog(text);
    }

    this.done = function() {
      finishExecuting();
    }

    this.clear = function() {
      FlushHistory();
    }
  }

  onData(cb) {
    this.listenData = cb;
  }

  onFinish(cb) {
    this.finishData = cb;
  }

  onError(cb) {
    this.errorListen = cb;
  }

  run(args) {
    let total = '';
    this.hash.listenRun.bind(this)(args);
    this.finishData(total);
  }
}


export class CommandExecutor {

  /**
   * @param  {String} cmd
   * @param  {String} dir
   * @param  {String} host
   */
  constructor(cmd, dir, host) {
    let list = cmd.split(' ');

    this.command = list.splice(0,1);
    this.args = list;
    this.directory = dir;
    this.host = host;
    this.listenData = [];
    this.listenFinish = [];
    this.listenErrors = [];
  }

  /**
   * @param  {Function} cb
   */
  onData(cb) {
    this.listenData.push(cb);
  }

  /**
   * @param  {Function} cb
   */
  onFinish(cb) {
    this.listenFinish.push(cb);
  }

  /**
   * @param  {Function} cb
   */
  onError(cb) {
    this.listenErrors.push(cb);
  }

  /**
   * Run command from baobab
   */
  exec() {
    const cmd = Tree.select('commands').get(this.command);
    let command = new Command(this.command, cmd);

    if (cmd) {
      command.onData(e => {
        this.listenData.map( cb => cb(command, e) );
      });

      command.onError(e => {
        this.listenErrors.map( cb => cb(command, e) );
      });

      command.onFinish(e => {
        this.listenFinish.map( cb => cb(command, e) );
      });

      command.run(this.args);
    }
    else {
      this.listenErrors.map(callback => {
        callback(command, 'Not found');
      });
    }
  }
}
