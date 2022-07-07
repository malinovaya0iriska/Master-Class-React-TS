import { Product, ProductPurchase } from '../../store/reducers';

export interface ProductCardProps {
  product: Product;
  addToCart(product: ProductPurchase): any;
}

export interface ProductCardState {
  showDetails: boolean;
}
