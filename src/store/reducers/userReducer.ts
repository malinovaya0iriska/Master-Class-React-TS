import update from 'immutability-helper';
import { Reducer } from 'redux';

import { UserAction, UserReducerAction } from 'store/actions';
import { ProductFilters } from 'store/reducers/shopReducer';

export interface User {
  filters: ProductFilters;
}

const userInitialState: User = {
  filters: {
    gender: [],
    category: [],
    trends: [],
  },
};

export const userReducer: Reducer<User, UserReducerAction> = (
  state = userInitialState,
  action,
) => {
  switch (action.type) {
    case UserAction.UPDATE_USER_FILTERS:
      return update(state, { filters: { $set: action.filters } });
    default:
      return state;
  }
};
