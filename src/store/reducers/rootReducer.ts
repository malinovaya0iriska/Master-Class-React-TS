import { CombinedState, combineReducers, Reducer } from 'redux';

import type { ProductDetailsReducerAction } from 'store/actions';
import { ProductDetails, productDetailsReducer } from 'store/reducers';

export const rootReducer: Reducer<
  CombinedState<{ productDetails: ProductDetails }>,
  ProductDetailsReducerAction
> = combineReducers({
  productDetails: productDetailsReducer,
});
export type AppStateType = ReturnType<typeof rootReducer>;
