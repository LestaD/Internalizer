
import React                              from 'react';
import { Route, DefaultRoute }            from 'react-router';

import ApplicationBase                    from 'Application/Base';
import IndexDefault                       from 'Index/Default/IndexDefault';


export default (
  <Route handler={ApplicationBase}>
    <DefaultRoute name="index"  handler={IndexDefault} />
  </Route>
);