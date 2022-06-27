import { Reducer } from 'redux';

import { ItemsAction, ItemsStateType } from 'store/action';
import ItemsActions from 'store/action/itemsAction';

export const itemsReducer: Reducer<ItemsStateType, ItemsAction> = (
  state = [],
  action: ItemsAction,
) => {
  const { type, payload } = action;
  switch (type) {
    case ItemsActions.ADD_ITEM:
      return [...state, ...payload];
    default:
      return state;
  }
};
