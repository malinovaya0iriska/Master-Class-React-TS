import { Reducer } from 'redux';

import { UserActions, UsersAction, UsersStateType } from 'store/action';

export const usersReducer: Reducer<UsersStateType, UsersAction> = (
  state = [],
  action: UsersAction,
): UsersStateType => {
  const { type, payload } = action;
  switch (type) {
    case UserActions.ADD_USER:
      return [...state, ...payload];
    default:
      return state;
  }
};
