import css from './TerminalHistoryRow.styl';
import React, { Component } from 'react';

import TerminalPs1 from 'Terminal/Ps1/TerminalPs1';


export default class TerminalHistoryRow extends Component {

  renderLog() {
    let log = this.props.log;
    if (log) {
      return (
        <div className="Log">
          {log.map((ll, id) => <div className="LogLine" key={id}>{ll}</div>)}
        </div>
      );
    }
  }

  renderBase() {
    let ps1 = '';
    let {
      command,
      directory,
      user,
      host,
    } = this.props;

    if (command) {
      command = <div className="Cmd">{command}</div>;
    }
    else {
      return '';
    }

    if (directory && user && host) {
      ps1 = <TerminalPs1 ps1={{u: user, d: directory, h: host}} />;
    }

    return (
      <div className="Base">
        {ps1}
        {command}
      </div>
    );
  }

  /**
   * Render component
   */
  render() {

    return (
      <div className={css.TerminalHistoryRow}>
        {this.renderBase()}
        {this.renderLog()}
      </div>
    );
  }
}