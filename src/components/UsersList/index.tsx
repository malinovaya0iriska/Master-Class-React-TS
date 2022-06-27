import { Component } from 'react';

import { connect, MapStateToProps } from 'react-redux';

import {
  UnionUsersListProps,
  UsersDispatchProps,
  UsersListProps,
  UsersListStateProps,
} from 'components/UsersList/type';
import { UserActions, UsersAction } from 'store/action';
import { CustomDispatch } from 'store/middlewares';
import { AppStoreType } from 'store/store';
import { ReturnComponentType } from 'types';

class UsersList extends Component<UnionUsersListProps> {
  constructor(props: UnionUsersListProps) {
    super(props);
    this.state = {};
  }

  clickAddUser = (): void => {
    const { addUser } = this.props;
    addUser(['Hanna', 'Valera']);
  };

  render(): ReturnComponentType {
    const { users } = this.props;

    return (
      <div>
        <ul>
          {users.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button onClick={this.clickAddUser} type="button">
          Add Users
        </button>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<
  UsersListStateProps,
  UsersListProps,
  AppStoreType
> = (state, ownProps) => {
  console.log('mapStateToProps', ownProps);

  return {
    users: state.users,
  };
};

const mapDispatchToProps = (
  dispatch: CustomDispatch<AppStoreType, UsersAction>,
  ownProps: UsersListProps,
): UsersDispatchProps => {
  console.log('mapStateToProps', ownProps);
  const usersActions = new UserActions();
  return {
    addUser: (payload: string[]) => dispatch(usersActions.addUsers(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
