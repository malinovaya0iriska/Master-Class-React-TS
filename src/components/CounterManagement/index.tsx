import { Component } from 'react';

import axios from 'axios';

import {
  CounterManagementProps,
  CounterManagementState,
  UserType,
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
      user: 1,
      userData: {
        avatar: '',
        email: '',
        first_name: '',
        id: 0,
        last_name: '',
      },
    };
  }

  componentDidMount(): void {
    console.log('componentDidMount');
    this.fetchUserData();
  }

  shouldComponentUpdate(
    nextProps: CounterManagementProps,
    nextState: CounterManagementState,
  ): boolean {
    console.log('shouldComponentUpdate', nextProps, nextState);

    return true;
  }

  componentDidUpdate(
    prevProps: CounterManagementProps,
    preState: CounterManagementState,
    snapshot: any,
  ): void {
    const { user } = this.state;
    if (preState.user !== user) {
      // to prevent unlimited loop
      this.fetchUserData();
    }
    console.log('snapshot', snapshot);
  }

  handleAddClick = (): void => {
    this.setState((prevValue: CounterManagementState) => ({
      user: prevValue.user + ONE,
    }));
  };

  handleMinusClick = (): void => {
    this.setState((prevValue: CounterManagementState) => ({
      user: prevValue.user - ONE,
    }));
  };

  static getDerivedStateFromProps(
    props: CounterManagementProps,
    state: CounterManagementState,
  ): null {
    console.log('getDerivedStateFromProps', props, state);

    return null;
  }

  getSnapshotBeforeUpdate(
    prevProps: CounterManagementProps,
    preState: CounterManagementState,
  ): { scrollPosition: string } {
    console.log('getSnapshotBeforeUpdate', prevProps, preState);

    return { scrollPosition: '152px' };
  }

  fetchUserData = (): void => {
    const { user } = this.state;
    axios.get(`https://reqres.in/api/users/${user}`).then(response => {
      const userData = response.data.data as UserType;

      this.setState({ userData });
    });
  };

  render(): ReturnComponentType {
    const { ownerName } = this.props;
    const { userData, user } = this.state;
    const { first_name: name } = userData;
    return (
      <>
        <h1>Update Component</h1>
        <div>{ownerName}</div>
        <p>UserID: {user}</p>
        <h3>{name}</h3>

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
