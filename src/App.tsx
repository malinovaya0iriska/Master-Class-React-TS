import { FC } from 'react';

import './App.css';
import { ReturnComponentType } from './types';

import { HomePage } from 'components/HomePage';

export const App: FC = (): ReturnComponentType => (
  <div className="App">
    <header className="App-header">
      <HomePage />
    </header>
  </div>
);
