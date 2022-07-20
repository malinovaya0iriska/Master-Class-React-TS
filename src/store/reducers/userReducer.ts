import update from 'immutability-helper';
import { Reducer } from 'redux';

import UserAction, { UserReducerAction } from '../actions/UserAction';

import { ProductFilters, ProductVariantCompleteDetails } from './shopReducer';

export interface ProductPurchase extends ProductVariantCompleteDetails {
  quantity: number;
}

export interface User {
  filters: ProductFilters;
  shopProductsPage: number;
  shopProductsPageSize: number;
  cart: ProductPurchase[];
}

export const userInitialState: User = {
  shopProductsPage: 1,
  shopProductsPageSize: 2,
  filters: {
    gender: [],
    category: [],
    trends: [],
  },
  cart: [],
};

export const userReducer: Reducer<User, UserReducerAction> = (
  state = userInitialState,
  action,
) => {
  switch (action.type) {
    case UserAction.UPDATE_USER_FILTERS:
      return update(state, { filters: { $set: action.filters } });
    case UserAction.UPDATE_USER_SHOP_PRODUCTS_PAGE:
      return update(state, { shopProductsPage: { $set: action.shopProductsPage } });
    case UserAction.ADD_TO_CART:
      return update(state, { cart: { $push: [action.productPurchase] } });
    case UserAction.REMOVE_TO_CART: {
      const { productId, variantId } = action.productPurchase;
      const newCart = state.cart.filter(
        product => product.productId !== productId && product.variantId !== variantId,
      );

      return update(state, { cart: { $set: newCart } });
    }
    case UserAction.CLEAN_CART:
      return update(state, { cart: { $set: [] } });

    default:
      return state;
  }
};