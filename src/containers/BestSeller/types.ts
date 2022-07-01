import { Product } from 'store/reducers';

export interface BestSellerStateProps {
  bestSellerProducts: Product[];
}

export interface BestSellerDispatchProps {
  fetchAllBestSellerProducts(): any;
}

export type BestSellerProps = BestSellerStateProps & BestSellerDispatchProps;
