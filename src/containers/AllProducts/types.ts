// import { ProductDetails } from 'store/reducers';
//
// export type AllProductsPageProps = AllProductsStateProps; // & AllProductsOwnProps;
//
// export interface AllProductsStateProps {
//   productDetails?: ProductDetails;
// }
// // export interface AllProductsOwnProps extends RouteChildrenProps {}

// import { RouteComponentProps } from 'react-router-dom';

import { GetProducsOptions } from 'api';
import { FetchShopProductsAction } from 'store/actions';
import { ProductFilters, ShopProducts } from 'store/reducers';

export interface AllProductsStateProps {
  shopProducts: ShopProducts;
  productFilters: ProductFilters;
  userFilters: ProductFilters;
}

// export interface AllProductsOwnProps extends RouteComponentProps {}

export interface AllProductsDispatchToProps {
  fetchShopProducts(options: GetProducsOptions): FetchShopProductsAction;
  fetchShopProductsAndFilters(): any;
  updateUserFilters(filters: ProductFilters): any;
}

export type AllProductsPageProps = AllProductsStateProps &
  // AllProductsOwnProps &
  AllProductsDispatchToProps;
