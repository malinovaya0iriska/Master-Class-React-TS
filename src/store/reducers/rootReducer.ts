import { combineReducers } from 'redux';

import { shopReducer } from './shopReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  shop: shopReducer,
  user: userReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;
