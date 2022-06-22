import { Component, ErrorInfo } from 'react';

import { Button, CounterManagement, ErrorHandling } from 'components';
import { ErrorHandlingState } from 'components/ErrorHandling/types';
import { ReturnComponentType } from 'types';
import './App.css';

type AppState = {
  change?: boolean;
  hasError: boolean;
};
export class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      change: false,
      hasError: false,
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

  render(): ReturnComponentType {
    const { change, hasError } = this.state;
    console.log(hasError);

    return (
      <div className="App">
        <h1>My APP</h1>

        {change && <CounterManagement ownerName="Tina" />}
        <Button type="primary">Primary</Button>
        <Button>Default</Button>

        <button type="submit" onClick={this.clickButton}>
          Change
        </button>

        {!hasError && <ErrorHandling />}
      </div>
    );
  }
}
