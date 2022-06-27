import { combineReducers, createStore } from 'redux';

import { itemsReducer, usersReducer } from 'store/reducers/';

export const rootReducer = combineReducers({
  items: itemsReducer,
  users: usersReducer,
});

export const store = createStore(rootReducer, {
  users: ['Tina', 'Mike'],
  items: ['goods', 'clothes', 'toys'],
});

export type AppStoreType = ReturnType<typeof rootReducer>;
