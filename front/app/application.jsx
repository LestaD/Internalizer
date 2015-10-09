
import 'babel-core/polyfill';
import 'index.html';
import 'stylus/internalizer.styl';
import 'normalize.css/normalize.css';

import React from 'react';
import Router from 'react-router';

import __decorators from 'utils/decorators';
import __polyfill from 'utils/polyfill';

import routes from 'routes';

const appElement = document.getElementById('internalizer');

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, appElement);
});