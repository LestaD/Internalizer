
import css from './NavigationTop.styl';
import React, { Component } from 'react';


export default class NavigationTop extends Component {

  /**
   * Render component
   */
  render() {
    return (
      <div className={css.NavigationTop}>
        <div className="InnerContainer">
          <div className="Link Logo">Internalizer</div>
          <div className="Menu">
            <div className="Link">Projects</div>
            <div className="Link">Manage</div>
            <a href="https://github.com/LestaD/Internalizer" target="_blank" className="Link">Contribute</a>
          </div>
        </div>
      </div>
    );
  }
}
