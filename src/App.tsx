import { FC } from 'react';

import './App.css';

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';

import { ReturnComponentType } from './types';

import { ItemsList, UsersList } from 'components';
import { HomePage } from 'components/HomePage';
import { customMiddleware } from 'store/middlewares/index';
import { rootReducer } from 'store/store';

const store = createStore(
  rootReducer,
  (window as any).initialState,
  applyMiddleware(customMiddleware),
);
export const App: FC = (): ReturnComponentType => (
  <Provider store={store}>
    <BrowserRouter basename="/test">
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<ItemsList ownerName="Mark Zuckerberg" />} path="/items" />
            <Route element={<UsersList />} path="/users" />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  </Provider>
);
