import { ReactNode } from 'react';

import { ProductPurchase } from 'store/reducers';

export interface CheckoutStateProps {
  cart: ProductPurchase[];
}

export interface CheckoutOwnProps {}

export type CheckoutPageProps = CheckoutStateProps & CheckoutOwnProps;

export interface CartDetailsType {
  cartItems: ReactNode[];
  totalPrice: number;
}
