/* eslint-disable class-methods-use-this */
import { ProductPurchase } from 'store/reducers';
import { ProductFilters } from 'store/reducers/shopReducer';

export type UserReducerAction =
  | UpdateUserFiltersAction
  | UpdateUserShopProductPageAction
  | AddToCartAction;

export interface UpdateUserFiltersAction {
  type: typeof UserAction.UPDATE_USER_FILTERS;
  filters: ProductFilters;
}

export interface UpdateUserShopProductPageAction {
  type: typeof UserAction.UPDATE_USER_SHOP_PRODUCTS_PAGE;
  shopProductsPage: number;
}

export interface AddToCartAction {
  type: typeof UserAction.ADD_TO_CART;
  productPurchase: ProductPurchase;
}

class UserAction {
  static readonly UPDATE_USER_FILTERS = 'UPDATE_USER_FILTERS';

  static readonly UPDATE_USER_SHOP_PRODUCTS_PAGE = 'UPDATE_USER_SHOP_PRODUCTS_PAGE';

  static readonly ADD_TO_CART = 'ADD_TO_CART';

  updateUserFilters = (filters: ProductFilters): UpdateUserFiltersAction => ({
    type: UserAction.UPDATE_USER_FILTERS,
    filters,
  });

  updateUserShopProductsPage = (
    shopProductsPage: number,
  ): UpdateUserShopProductPageAction => ({
    type: UserAction.UPDATE_USER_SHOP_PRODUCTS_PAGE,
    shopProductsPage,
  });

  addToCart = (productPurchase: ProductPurchase): AddToCartAction => ({
    type: UserAction.ADD_TO_CART,
    productPurchase,
  });
}

export default UserAction;
