import css from './TerminalInput.styl';
import React, { Component } from 'react';
import CN from 'classnames';

import { SetExecuting, finishExecuting, addExecutingLog, Execute, FlushHistory } from 'actions/CommandActions';
import { CommandExecutor } from 'models/Command';

import TerminalPs1 from 'Terminal/Ps1/TerminalPs1';


@SubscribedTo('dir', 'executing', 'cmdHistory')
export default class TerminalInput extends Component {

  static propTypes = {
    ps1: React.PropTypes.object.isRequired,
  }

  state = {
    currentCommand: '',
    currentHistory: 0
  }

  onChange(e) {
    this.setState({ currentCommand: e.target.value });
  }

  onKey(e) {
    // console.log(e.key, e.keyCode, e.ctrlKey);
    if (e.keyCode === 13) { // ENTER
      if (!e.ctrlKey && !e.shiftKey) {

        if (this.state.currentCommand.trim() == '') return;

        SetExecuting(this.state.currentCommand, this.props.dir.wd, this.props.ps1.u, this.props.ps1.h);
        this.setState({ currentCommand: '' });

        let cmde = new CommandExecutor(this.state.currentCommand, this.props.dir.wd, this.props.ps1.u);

        cmde.onData((cmd, text) => {
          addExecutingLog(text);
        });

        cmde.onFinish((cmd, text) => {
          if (text) addExecutingLog(text);
          finishExecuting();
        });

        cmde.onError((cmd, error) => {
          addExecutingLog('Command not found');
          finishExecuting();
          console.warn('Error command', error, 'in', cmd.command);
        });

        cmde.exec();
        this.setState({ currentHistory: this.props.cmdHistory.length + 1 });
      }

      if (e.ctrlKey && !e.shiftKey) { // CTRL + ENTER
        console.info('Expand input field');
      }
    }
    else if (e.keyCode === 76 && e.ctrlKey) { // CTRL + L
      FlushHistory();
    }
    else if (e.keyCode === 9) { // TAB
      console.info('Autocomplete');
    }
    else if (e.keyCode == 38) { // ARROW UP
      this.historyUp();
    }
    else if (e.keyCode == 40) { // ARROW DOWN
      this.historyDown();
    }
  }

  historyUp() {
    let lastcmd = this.props.cmdHistory[--this.state.currentHistory];
    if (lastcmd) {
      this.setState({ currentCommand: lastcmd })
    }
    else {
      this.state.currentHistory = 0;
      this.setState({ currentCommand: '' })
    }
  }

  historyDown() {
    let lastcmd = this.props.cmdHistory[++this.state.currentHistory];
    if (lastcmd) {
      this.setState({ currentCommand: lastcmd })
    }
    else {
      this.state.currentHistory = this.props.cmdHistory.length;
      this.setState({ currentCommand: '' })
    }
  }

  componentDidMount() {
    this.refs.inp.getDOMNode().focus();
  }

  /**
   * Render component
   */
  render() {
    let ps1 = this.props.ps1;
    ps1.d = this.props.dir.wd;

    let disabled = '';
    if (this.props.executing) {
      disabled = {disabled: disabled};
    }

    return (
      <div className={CN(css.TerminalInput, {Disabled: this.props.executing})}>
        <TerminalPs1 ps1={ps1} />
        <input type="text" ref="inp" value={this.state.currentCommand} onChange={e => this.onChange(e)} onKeyDown={e => this.onKey(e)} />
      </div>
    );
  }
}