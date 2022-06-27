import { Reducer } from 'redux';

export const ADD_ITEM = 'add-item-to-the-list';

type ItemsAction = {
  type: string;
  payload: ItemsStateType;
};

type ItemsStateType = string[];

export const itemReducer: Reducer<ItemsStateType, ItemsAction> = (
  state = [],
  action: ItemsAction,
) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEM:
      return [...state, ...payload];
    default:
      return state;
  }
};
