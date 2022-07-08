export interface User {
  id: number;
  name: string;
}

export interface UserReducer {
  users: User[];
  newUserName: string;
}

export type UserReducerAction = UserAddAction | UserChangeNameAction;

export interface UserAddAction {
  type: 'ADD_USER';
}

export interface UserChangeNameAction {
  type: 'changeNewName';
  payload: string;
}
