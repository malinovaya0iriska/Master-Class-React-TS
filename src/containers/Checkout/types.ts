import { ReactNode } from 'react';

import { ProductPurchase } from 'store/reducers';

export interface CheckoutStateProps {
  cart: ProductPurchase[];
}

export interface CheckoutOwnProps {}

export interface CheckoutDispatchProps {
  cleanCart(): void;
}

export type CheckoutPageProps = CheckoutStateProps &
  CheckoutOwnProps &
  CheckoutDispatchProps;

export interface CartDetailsType {
  cartItems: ReactNode[];
  totalPrice: number;
}
