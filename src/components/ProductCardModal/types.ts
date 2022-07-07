import { ProductVariantCompleteDetails } from '../../store/reducers/shopReducer';
import { VariantsOptionsAvailable } from '../../utils/product';

import { ProductPurchase } from 'store/reducers/userReducer';

export interface ProductCardModalProps {
  show: boolean;
  onClickOutsideModalBody(): void;
  initialVariant: ProductVariantCompleteDetails;
  variants: ProductVariantCompleteDetails[];
  variantsOptionsAvailable: VariantsOptionsAvailable;
  addToCart(product: ProductPurchase): any;
}

export interface ProductCardModalState {
  selectedVariant: ProductVariantCompleteDetails;
  quantity: number;
}
