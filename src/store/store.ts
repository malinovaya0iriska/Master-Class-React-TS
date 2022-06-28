import { applyMiddleware, combineReducers, createStore } from 'redux';

import { customMiddleware } from './middlewares/index';
import { itemsReducer, usersReducer } from './reducers';

export const rootReducer = combineReducers({
  items: itemsReducer,
  users: usersReducer,
});

const initialState = {
  users: ['Tina', 'Mike'],
  items: ['goods', 'clothes', 'toys'],
};

// export const store = createStore(
//   rootReducer,
//   {
//     users: ['Tina', 'Mike'],
//     items: ['goods', 'clothes', 'toys'],
//   },
//   composeWithDevTools(applyMiddleware(customMiddleware)),
// );

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(customMiddleware),
);
export type AppStoreType = ReturnType<typeof rootReducer>;
