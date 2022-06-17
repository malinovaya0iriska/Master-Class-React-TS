import { Component, ReactElement } from 'react';

import axios, { AxiosResponse } from 'axios';

import {
  CounterManagementProps,
  CounterManagementState,
  UserTypeAPI,
} from 'components/CounterManagement/types';
import { MAX_USER_ID, ONE } from 'constants/index';
import { hasUserAlreadyFetched } from 'helpers';
import { ReturnComponentType } from 'types';

export class CounterManagement extends Component<
  CounterManagementProps,
  CounterManagementState
> {
  constructor(props: CounterManagementProps) {
    super(props);

    this.state = {
      currentUserID: 1,
      users: [],
    };
  }

  componentDidMount(): void {
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
    const { users, currentUserID } = this.state;
    if (
      preState.currentUserID !== currentUserID &&
      !hasUserAlreadyFetched(users, currentUserID)
    ) {
      // to prevent unlimited loop
      this.fetchUserData();
    }
    console.log('snapshot', snapshot);
  }

  handleAddClick = (): void => {
    const { currentUserID } = this.state;
    if (currentUserID < MAX_USER_ID) {
      this.setState((prevValue: CounterManagementState) => ({
        currentUserID: prevValue.currentUserID + ONE,
      }));
    }
  };

  handleMinusClick = (): void => {
    const { currentUserID } = this.state;
    if (currentUserID > ONE) {
      this.setState((prevValue: CounterManagementState) => ({
        currentUserID: prevValue.currentUserID - ONE,
      }));
    }
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

  fetchUserData = async (): Promise<void> => {
    const { currentUserID, users } = this.state;
    const response: AxiosResponse<UserTypeAPI, number> = await axios.get(
      `https://reqres.in/api/users/${currentUserID}`,
    );
    const { data } = response.data;
    console.log(data, 'DATA');

    this.setState({ users: [...users, data] });
  };

  renderUsers = (): ReactElement[] => {
    const { users, currentUserID } = this.state;
    return users
      .filter(user => user.id <= currentUserID)
      .map(({ avatar, first_name: name, last_name: surname }) => (
        <div key={name}>
          <img src={avatar} alt="" />
          <span>{`${name}${surname}`}</span>
        </div>
      ));
  };

  render(): ReturnComponentType {
    const { currentUserID } = this.state;
    return (
      <>
        <h1>Users Management</h1>
        <div>{this.renderUsers()}</div>
        <div>Number of Users: {currentUserID}</div>
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
