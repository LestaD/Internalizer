import css from './TerminalHistory.styl';
import React, { Component } from 'react';

import TerminalHistoryRow from 'Terminal/HistoryRow/TerminalHistoryRow';


@SubscribedTo('history', 'executing')
export default class TerminalHistory extends Component {

  componentDidUpdate() {
    if (this.refs.element) {
      let el = this.refs.element;
      el.getDOMNode().scrollTop = el.getDOMNode().scrollHeight;
    }
  }

  /**
   * Render component
   */
  render() {
    let executing = this.props.executing;

    if (executing) {
      executing = <TerminalHistoryRow {...executing} />;
    }

    return (
      <div className={css.TerminalHistory} ref="element">
        {this.props.history.map((cmd, cid) => {
          return <TerminalHistoryRow key={cid} {...cmd} />
        })}
        {executing}
      </div>
    );
  }
}