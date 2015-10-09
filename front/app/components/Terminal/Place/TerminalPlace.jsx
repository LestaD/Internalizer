import css from './TerminalPlace.styl';
import React, { Component } from 'react';

import { TextLog, getCommands, getCommand, FlushCmdHistory } from 'actions/CommandActions';
import { getCurrentDir } from 'actions/DirectoryActions';
import Command from 'models/Command';

import TerminalHistory from 'Terminal/History/TerminalHistory';
import TerminalInput from 'Terminal/Input/TerminalInput';


export default class TerminalPlace extends Component {

  componentDidMount() {
    InitRuntime();
    TextLog('React.Terminal v' + String(VERSION));
    TextLog('Type `help` to show list of available commands');
  }

  /**
   * Render component
   */
  render() {
    const user = this.props.user || 'user';
    const host = this.props.host || 'host';
    let ps1 = {u: user, h: host};

    return (
      <div className={css.TerminalPlace}>
        <TerminalHistory />
        <TerminalInput ps1={ps1} />
      </div>
    );
  }
}


function InitRuntime() {

  /**
   * COMMAND 'CLEAR'
   */
  Command.Make('clear', function() {
    this.description = ['Clear the terminal screen'];
    this.onRun(function(args) {
      this.done();
      this.clear();
    });
  });


  /**
   * COMMAND 'HELP'
   */
  Command.Make('help', function() {
    this.description = ['Get help about commands',
                        'Usage: help [command]'];
    this.onRun(function(args) {
      const [command, argument] = args;

      if (command) {
        const cmd = getCommand(command);
        for (const line of cmd.description) {
          this.print(line);
        }
        if (cmd.description.length == 0) {
          this.print('No help provided');
        }
        this.done();
      }
      else {
        this.print('Available commands:');
        const listCmd = getCommands();
        for (const commandName in listCmd) {
          this.print(" - " + commandName);
        }
        this.print('Type `help <command name>` to get help about one command.')
        this.done();
      }
    });
  });

  /**
   * COMMAND 'PWD'
   */
  Command.Make('pwd', function() {
    this.description = ['Return working directory path'];
    this.onRun(function(args) {
      this.print(getCurrentDir());
      this.done();
    });
  });


  /**
   * COMMAND 'CD'
   */
  // Command.Make('cd', function() {

  // });


  /**
   * COMMAND 'FLUSH'
   */
  Command.Make('flush', function() {
    this.description = ['Clear history of commands and clear terminal window'];
    this.onRun(function(args) {
      this.clear();
      FlushCmdHistory();
      this.done();
    });
  });

}