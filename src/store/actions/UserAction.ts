/* eslint-disable class-methods-use-this */
import { ProductFilters } from 'store/reducers/shopReducer';

export type UserReducerAction = UpdateUserFiltersAction;

export interface UpdateUserFiltersAction {
  type: typeof UserAction.UPDATE_USER_FILTERS;
  filters: ProductFilters;
}

class UserAction {
  static readonly UPDATE_USER_FILTERS = 'UPDATE_USER_FILTERS';

  updateUserFilters = (filters: ProductFilters): UpdateUserFiltersAction => ({
    type: UserAction.UPDATE_USER_FILTERS,
    filters,
  });
}

export default UserAction;
