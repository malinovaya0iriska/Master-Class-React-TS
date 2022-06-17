import { Component, ReactElement } from 'react';

import {
  CounterManagementProps,
  CounterManagementState,
} from 'components/CounterManagement/types';

export class CounterManagement extends Component<
  CounterManagementProps,
  CounterManagementState
> {
  constructor(props: CounterManagementProps) {
    super(props);

    this.state = {
      counter: 0,
    };
  }

  handleAddClick = (): void => {
    this.setState((prevValue: CounterManagementState) => ({
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      counter: prevValue.counter + 1,
    }));
  };

  handleMinusClick = (): void => {
    this.setState((prevValue: CounterManagementState) => ({
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      counter: prevValue.counter - 1,
    }));
  };

  render(): ReactElement {
    const { ownerName } = this.props;
    const { counter } = this.state;
    return (
      <>
        <h1>fghdsfjhd</h1>
        <div>{ownerName}</div>
        <p>Counter: {counter}</p>
        <button type="submit" onClick={this.handleAddClick}>
          Increase
        </button>
        <button type="submit" onClick={this.handleMinusClick}>
          Decrease
        </button>
      </>
    );
  }
}
