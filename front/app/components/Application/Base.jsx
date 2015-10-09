
import css from './Base.styl';
import React, { Component } from 'react';
import { RouteHandler } from 'react-router';
import { root as Root } from 'baobab-react/higher-order';
import Tree from 'db/tree';

import NavigationTop from 'Navigation/Top/NavigationTop';


class ApplicationBase extends Component {
  render() {
    return (
      <div>
        <NavigationTop />
        <div className={css.Base}>
          <RouteHandler />
        </div>
      </div>
    );
  }
}


export default Root(ApplicationBase, Tree);