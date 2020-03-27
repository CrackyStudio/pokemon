import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app';
import State from 'hooks/state';
import { StateProvider } from 'hooks/provider';
import { Reducer } from 'hooks/reducer';
import * as serviceWorker from 'serviceWorker';
import 'styles/index.scss';

ReactDOM.render(
  <StateProvider initialState={State} reducer={Reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
