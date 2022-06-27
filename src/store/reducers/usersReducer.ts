import { Reducer } from 'redux';

export const ADD_USER = 'add-user-to-the-list';

type UsersAction = {
  type: string;
  payload: UsersStateType;
};

type UsersStateType = string[];

export const usersReducer: Reducer<UsersStateType, UsersAction> = (
  state = [],
  action: UsersAction,
): UsersStateType => {
  const { type, payload } = action;
  switch (type) {
    case ADD_USER:
      return [...state, ...payload];
    default:
      return state;
  }
};
