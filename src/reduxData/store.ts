import { createStore } from 'redux';

import { itemReducer } from 'reduxData';

export const store = createStore(itemReducer, ['goods', 'clothes', 'toys']);

export type AppStoreType = typeof store;
