// eslint-disable-next-line import/order
import { CounterManagement } from 'components/CounterManagement';

import { FC } from 'react';

import './App.css';
import { Button } from './components/Button';
import { ReturnComponentType } from './types';

export const App: FC = (): ReturnComponentType => (
  <div className="App">
    <header className="App-header">
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <Button>Default</Button>
      <h1>Learn React</h1>
      <Button type="primary">Primary</Button>
      <CounterManagement ownerName="Tina" />
    </header>
  </div>
);
