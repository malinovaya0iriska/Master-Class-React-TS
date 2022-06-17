import { Component } from 'react';

import axios from 'axios';

import {
  CounterManagementProps,
  CounterManagementState,
} from 'components/CounterManagement/types';
import { ONE } from 'constants/index';
import { ReturnComponentType } from 'types';

export class CounterManagement extends Component<
  CounterManagementProps,
  CounterManagementState
> {
  constructor(props: CounterManagementProps) {
    super(props);

    this.state = {
      counter: 0,
      users: [],
    };
  }

  componentDidMount(): void {
    console.log('componentDidMount');

    axios.get('https://reqres.in/api/users?page=2').then(response => {
      const { data } = response;
      const users = data.data.map((userData: any) => userData.first_name);
      this.setState({ users });
    });

    window.addEventListener('click', this.clickWindow);
  }

  componentWillUnmount(): void {
    window.removeEventListener('click', this.clickWindow);
  }

  handleAddClick = (): void => {
    this.setState((prevValue: CounterManagementState) => ({
      counter: prevValue.counter + ONE,
    }));
  };

  handleMinusClick = (): void => {
    this.setState((prevValue: CounterManagementState) => ({
      counter: prevValue.counter - ONE,
    }));
  };

  static getDerivedStateFromProps(
    props: CounterManagementProps,
    state: CounterManagementState,
  ): null {
    console.log('getDerivedStateFromProps', props, state);

    // return props.ownerName === 'Tina' ? { counter: 6 } : null; // it doesn't let update counter by buttons
    return null;
  }

  clickWindow = (): void => {
    console.log('clickWindow occured');

    this.setState((prevValue: CounterManagementState) => ({
      counter: prevValue.counter + ONE,
    }));
  };

  render(): ReturnComponentType {
    const { ownerName } = this.props;
    const { counter, users } = this.state;
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
        <p>It won&apos;t work until eventListener on window increases counter</p>

        <ul>
          {users.map((user: string) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </>
    );
  }
}
