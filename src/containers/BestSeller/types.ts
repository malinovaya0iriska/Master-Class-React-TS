import { Product, ProductPurchase } from 'store/reducers';

export interface BestSellerStateProps {
  bestSellerProducts: Product[];
}

export interface BestSellerDispatchProps {
  fetchAllBestSellerProducts(): any;
  addToCart(product: ProductPurchase): any;
}

export type BestSellerProps = BestSellerStateProps & BestSellerDispatchProps;
