import { FC } from 'react';

import { Provider } from 'react-redux';
import './App.css';

import { ReturnComponentType } from './types';

import { ItemsList, UsersList } from 'components';
import { HomePage } from 'components/HomePage';
import { store } from 'store';

export const App: FC = (): ReturnComponentType => (
  <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <HomePage />
        <ItemsList ownerName="Mila Kunis" />
        <UsersList />
      </header>
    </div>
  </Provider>
);
