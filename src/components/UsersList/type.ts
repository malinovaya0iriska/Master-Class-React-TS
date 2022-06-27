export type UsersListProps = {};

export type UsersListStateProps = {
  users: string[];
};

export type UnionUsersListProps = UsersListProps &
  UsersListStateProps &
  UsersDispatchProps;

export type UsersDispatchProps = {
  addUser: (users: string[]) => void;
};
