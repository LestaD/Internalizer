import React, { Component }   from 'react';
import { RouteHandler }       from 'react-router';
import Commands               from 'commands';

import TerminalPlace          from 'Terminal/Place/TerminalPlace';


@SubscribedTo('state.users.current', 'state.hosts.current')
export default class IndexDefault extends Component {
  componentWillMount() {
    Commands();
  }


  render() {
    return (
      <div>
        <TerminalPlace user={this.props.state_users_current} host={this.props.state_hosts_current} />
      </div>
    )
  }
}