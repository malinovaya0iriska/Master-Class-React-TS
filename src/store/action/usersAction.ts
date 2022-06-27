import { Store } from 'redux';

import { AppStoreType } from 'store/store';

export type UsersAction = {
  type: string;
  payload: UsersStateType;
};

export type UsersStateType = string[];

class UserActions {
  static ADD_USER = 'add-user-to-the-list';

  // eslint-disable-next-line class-methods-use-this
  addUsers =
    (payload: string[]) =>
    (store: Store<AppStoreType>): UsersAction => {
      console.log(store.getState());
      return {
        type: UserActions.ADD_USER,
        payload,
      };
    };
}
export default UserActions;
