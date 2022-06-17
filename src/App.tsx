import { Component } from 'react';

import { Button } from 'components/Button';
import { CounterManagement } from 'components/CounterManagement';
import { ReturnComponentType } from 'types';
import './App.css';

type AppState = {
  change: boolean;
};
export class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      change: false,
    };
  }

  clickButton = (): void => {
    const { change } = this.state;
    this.setState({ change: !change });
  };

  render(): ReturnComponentType {
    const { change } = this.state;
    return (
      <div className="App">
        <h1>My APP</h1>

        {change && <CounterManagement ownerName="Tina" />}
        <Button type="primary">Primary</Button>
        <Button>Default</Button>

        <button type="submit" onClick={this.clickButton}>
          Change
        </button>
      </div>
    );
  }
}

// export const App: FC = (): ReturnComponentType => (
//   <div className="App">
//     <header className="App-header">
//       <p>
//         Edit <code>src/App.tsx</code> and save to reload.
//       </p>
//       <Button>Default</Button>
//       <h1>Learn React</h1>
//       <Button type="primary">Primary</Button>
//       <CounterManagement ownerName="Tina" />
//     </header>
//   </div>
// );
