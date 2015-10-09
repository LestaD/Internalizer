
import React, { Component } from 'react';
import { RouteHandler } from 'react-router';
import { root as Root } from 'baobab-react/higher-order';
import Tree from 'db/tree';

class ApplicationBase extends Component {
  render() {
    return (
      <RouteHandler />
    );
  }
}


export default Root(ApplicationBase, Tree);