/* eslint-disable class-methods-use-this */
import { ProductDetails } from 'store/reducers';

export type ProductDetailsReducerAction = ProductDetailsSetAction &
  ProductDetailsFetchAction;
export interface ProductDetailsSetAction {
  type: typeof ProductDetailAction.SET_PRODUCTS_DETAILS;
  payload: ProductDetails;
}

export interface ProductDetailsFetchAction {
  type: typeof ProductDetailAction.FETCH_PRODUCTS_DETAILS;
}

class ProductDetailAction {
  static readonly FETCH_PRODUCTS_DETAILS = 'FETCH_PRODUCTS_DETAILS';

  static readonly SET_PRODUCTS_DETAILS = 'SET_PRODUCTS_DETAILS';

  fetch = (): ProductDetailsFetchAction => ({
    type: ProductDetailAction.FETCH_PRODUCTS_DETAILS,
  });

  set = (productDetails: ProductDetails): ProductDetailsSetAction => ({
    type: ProductDetailAction.SET_PRODUCTS_DETAILS,
    payload: productDetails,
  });
}

export default ProductDetailAction;
