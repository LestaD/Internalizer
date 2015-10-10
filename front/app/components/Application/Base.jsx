
import css from './Base.styl';
import React, { Component } from 'react';
import { RouteHandler } from 'react-router';
import { root as Root } from 'baobab-react/higher-order';
import Tree from 'db/tree';

import { getStatus } from 'actions/baseActions';

import NavigationTop from 'Navigation/Top/NavigationTop';


class ApplicationBase extends Component {
  state = {
    loading: true,
    error: false
  }

  componentWillMount() {
    getStatus()
      .then((xhr, status) => {
        if (status.status === 'working') {
          this.setState({ loading: false, error: false });
        }
        else {
          this.setState({ loading: false, error: true });
        }
      })
      .catch((xhr, error) => {
        this.setState({ loading: false, error: true });
      });
  }

  renderLoading() {
    return (
      <div className="InnerContainer">
        <div>Loading...</div>
      </div>
    );
  }

  renderError() {
    return <div>ERROR! Connection refused!</div>;
  }

  render() {

    if (this.state.loading) {
      return this.renderLoading();
    }

    if (this.state.error) {
      return this.renderError();
    }

    return (
      <div className={css.Base}>
        <NavigationTop />
        <div className={css.Content}>
          <div className="InnerContainer">
            <RouteHandler />
          </div>
        </div>
      </div>
    );
  }
}


export default Root(ApplicationBase, Tree);