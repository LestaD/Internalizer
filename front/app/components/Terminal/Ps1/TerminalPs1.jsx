import css from './TerminalPs1.styl';
import React, { Component } from 'react';

export default class TerminalPs1 extends Component {

  /**
   * Render component
   */
  render() {
    const {u: user, h: host, d: dir} = this.props.ps1;

    return (
      <div className={css.TerminalPs1}>
        <div className="green">{user}</div>
        <div className="gray">@</div>
        <div className="green">{host}</div>
        <div className="gray">&nbsp;</div>
        <div className="yellow">[{dir}]</div>
        <div className="white">&nbsp;$</div>
      </div>
    );
  }
}