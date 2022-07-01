import { combineReducers } from 'redux';

import { shopReducer } from 'store/reducers/shopReducer';
import { userReducer } from 'store/reducers/userReducer';

export const rootReducer = combineReducers({
  shop: shopReducer,
  user: userReducer,
});
export type AppStateType = ReturnType<typeof rootReducer>;
