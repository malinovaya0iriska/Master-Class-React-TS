import { ProductVariantCompleteDetails, ProductPurchase } from 'store/reducers';
import { VariantsOptionsAvailable } from 'utils/product';

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
