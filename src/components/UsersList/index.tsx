import { Component } from 'react';

import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';

import {
  UnionUsersListProps,
  UsersDispatchProps,
  UsersListProps,
  UsersListStateProps,
} from 'components/UsersList/type';
import { ADD_USER } from 'store/reducers/usersReducer';
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

const mapDispatchToProps: MapDispatchToPropsFunction<
  UsersDispatchProps,
  UsersListProps
> = (dispatch, ownProps) => {
  console.log('mapStateToProps', ownProps);
  return {
    addUser: (payload: string[]) => dispatch({ type: ADD_USER, payload }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
