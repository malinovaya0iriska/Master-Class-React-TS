import { Reducer } from 'redux';
import { createSelector } from 'reselect';

import { ItemsAction, ItemsActions, ItemsStateType } from '../action';
import { AppStoreType } from '../store';

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

export const itemsWithT = createSelector(
  (state: AppStoreType) => state.items,
  (items: ItemsStateType) => items.filter((item: string) => item.includes('t')),
);
