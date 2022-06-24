import { ErrorInfo, PureComponent } from 'react';

import {
  Button,
  CounterManagement,
  ErrorHandling,
  MyForContext,
  MyInput,
  MyReactMemo,
  TrackClick,
  WrappedWithHOC,
} from 'components';
import { ErrorHandlingState } from 'components/ErrorHandling/types';
import { MyContextProvider } from 'context';
import { ReturnComponentType } from 'types';
import './App.css';

type AppState = {
  change?: boolean;
  hasError: boolean;
  name: string;
  address: {
    city: string;
    street: string;
  };
};
export class App extends PureComponent<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      change: false,
      hasError: false,
      name: 'Mia',
      address: {
        city: 'Minsk',
        street: 'Chruckogo',
      },
    };
  }

  static getDerivedStateFromError(error: Error): ErrorHandlingState {
    console.log('APP getDerivedStateFromError', error);

    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log('APP componentDidCatch', error);
    console.log('APP componentDidCatch', info);
  }

  clickButton = (): void => {
    const { change } = this.state;
    this.setState({ change: !change });
  };

  handleSetAddress = (): void => {
    const newAddress = {
      city: 'Brest',
      street: 'Novaya',
    };
    this.setState({ address: newAddress });
  };

  handleSetName = (): void => {
    this.setState({ name: 'Kristina' });
  };

  render(): ReturnComponentType {
    const { change, hasError, name, address } = this.state;
    console.log(hasError);
    console.log('PureComponent render');

    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <MyContextProvider>
        <div className="App">
          <h1>My APP</h1>

          {change && <CounterManagement ownerName="Tina" />}
          <Button type="primary">Primary</Button>
          <Button>Default</Button>

          <button type="submit" onClick={this.clickButton}>
            Change
          </button>

          {!hasError && <ErrorHandling />}

          <MyReactMemo name={name} address={address} />
          <button type="submit" onClick={this.handleSetAddress}>
            Change Address
          </button>

          <p>{name}</p>
          <p>{address.city}</p>
          <button type="submit" onClick={this.handleSetName}>
            Change Name
          </button>
          <MyForContext />
          <TrackClick renderProps={click => <MyInput click={click} />} />

          <WrappedWithHOC />
        </div>
      </MyContextProvider>
    );
  }
}
