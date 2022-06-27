import { Reducer } from 'redux';

import { ItemsAction, ItemsActions, ItemsStateType } from 'store/action';

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
