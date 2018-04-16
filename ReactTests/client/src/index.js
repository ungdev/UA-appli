import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';

import { Route } from 'react-router';
import Switch from 'react-router-dom/Switch';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/tournois/hearthstone/decks" component={App} />
      
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
