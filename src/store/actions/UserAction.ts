/* eslint-disable class-methods-use-this */
import { ProductFilters } from 'store/reducers/shopReducer';

export type UserReducerAction = UpdateUserFiltersAction | UpdateUserShopProductPageAction;

export interface UpdateUserFiltersAction {
  type: typeof UserAction.UPDATE_USER_FILTERS;
  filters: ProductFilters;
}

export interface UpdateUserShopProductPageAction {
  type: typeof UserAction.UPDATE_USER_SHOP_PRODUCTS_PAGE;
  shopProductsPage: number;
}

class UserAction {
  static readonly UPDATE_USER_FILTERS = 'UPDATE_USER_FILTERS';

  static readonly UPDATE_USER_SHOP_PRODUCTS_PAGE = 'UPDATE_USER_SHOP_PRODUCTS_PAGE';

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
}

export default UserAction;
