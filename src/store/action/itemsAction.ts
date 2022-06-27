import { Store } from 'redux';

import { AppStoreType } from 'store';

export type ItemsStateType = string[];

export type ItemsAction = {
  type: string;
  payload: ItemsStateType;
};

class ItemsActions {
  static ADD_ITEM = 'add-item-to-the-list';

  // eslint-disable-next-line class-methods-use-this
  addItems =
    (payload: string[]) =>
    (store: Store<AppStoreType>): ItemsAction => {
      console.log(store.getState());
      return {
        type: ItemsActions.ADD_ITEM,
        payload,
      };
    };
}
export default ItemsActions;
