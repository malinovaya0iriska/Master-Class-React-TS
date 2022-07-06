import { RefObject } from 'react';

import { CustomerInformationField, CustomerInformationFieldsList } from 'constants/user';
import { ProductPurchase } from 'store/reducers';

export interface CustomerInformationProps {
  cart: ProductPurchase[];
  cleanCart(): any;
}

export interface CustomerInformationState extends CustomerInformationFieldsList {
  error: CustomerInformationFieldsList;
  hasCompletePurchaseClick: boolean;
  showThankyouModal: boolean;
}

export type CustomerInformationFieldRefs = {
  [field in CustomerInformationField]: RefObject<HTMLInputElement>;
};
