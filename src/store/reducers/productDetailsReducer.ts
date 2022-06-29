import { Reducer } from 'redux';

import { ProductDetailsAction, ProductDetailsReducerAction } from 'store/actions';

export interface ProductDetails {
  page: number;
  nextPage: boolean;
  productsCount: number;
  products: Product[];
}

export interface Product {
  id: string;
  category: string[];
  title: string;
  isBestSeller?: boolean;
  variants: Variant[];
}

export interface Variant {
  id: string;
  size: string;
  color: string;
  price: string;
  stock: number;
  discount?: string;
  image: string;
}

export const productDetailsReducer: Reducer<
  ProductDetails,
  ProductDetailsReducerAction
> = (
  state = {} as ProductDetails,
  { type, payload }: ProductDetailsReducerAction,
): ProductDetails => {
  switch (type) {
    case ProductDetailsAction.SET_PRODUCTS_DETAILS:
      // eslint-disable-next-line no-debugger
      debugger;
      return payload;
    default:
      return state;
  }
};
