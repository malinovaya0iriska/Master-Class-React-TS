import { FC } from 'react';

import { Provider } from 'react-redux';
import './App.css';

import { ReturnComponentType } from './types';

import { ItemsList } from 'components';
import { HomePage } from 'components/HomePage';
import { store } from 'reduxData';

export const App: FC = (): ReturnComponentType => (
  <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <HomePage />
        <ItemsList ownerName="Mila Kunis" />
      </header>
    </div>
  </Provider>
);
