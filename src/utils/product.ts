import { CSSProperties } from 'react';

import { ONE } from '../constants/index';
import {
  Product,
  ProductPurchase,
  ProductVariant,
  ProductVariantCompleteDetails,
} from '../store/reducers';

import { omit } from './index';

export type InitialVariant = ProductVariantCompleteDetails | null;

export interface VariantsOptionsAvailable {
  [sizes: string]: string[];
}

export interface GetProductVariantDetails {
  initialVariant: InitialVariant;
  variants: ProductVariantCompleteDetails[];
  variantsOptionsAvailable: VariantsOptionsAvailable;
}

export const getProductVariantDetails = (product: Product): GetProductVariantDetails => {
  let initialVariant: InitialVariant = null;
  let foundInitialVariant = false;
  const variants: ProductVariantCompleteDetails[] = [];
  const variantsOptionsAvailable: VariantsOptionsAvailable = {};

  product.variants.forEach((variant: ProductVariant) => {
    const completeDetails: ProductVariantCompleteDetails = {
      ...omit(variant, ['id']),
      ...omit(product, ['id', 'variants']),
      productId: product.id,
      variantId: variant.id,
    };

    if (!foundInitialVariant && variant.stock) {
      foundInitialVariant = true;
      initialVariant = completeDetails;
    }

    if (variant.stock) {
      const variantSizeData = variantsOptionsAvailable[variant.size];
      if (variantSizeData && !variantSizeData.includes(variant.color)) {
        variantSizeData.push(variant.color);
      } else if (!variantSizeData) {
        variantsOptionsAvailable[variant.size] = [variant.color];
      }
    }

    variants.push(completeDetails);
  });

  return {
    initialVariant,
    variants,
    variantsOptionsAvailable,
  };
};

export const getDiscountedPrice = (price: string, discount: string): number => {
  const currentPrice = parseFloat(price.replace('$', ''));
  let discountedPrice: number;

  if (discount.includes('$')) {
    discountedPrice = currentPrice - parseFloat(discount.replace('$', ''));
  } else {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    discountedPrice = currentPrice - currentPrice * (parseFloat(discount) / 100);
  }

  return discountedPrice;
};

export const parsePrice = (price: string): number => parseFloat(price.replace('$', ''));

export const getSubtotalPrice = (product: ProductPurchase): number => {
  const { discount, price, quantity } = product;

  const currentPrice = discount ? getDiscountedPrice(price, discount) : parsePrice(price);

  return currentPrice * quantity;
};

export const getBackgroundColorStyleForButton = (color: string): CSSProperties => {
  const arrayColors = color.split('&');

  return arrayColors.length > ONE
    ? { backgroundImage: `linear-gradient(${arrayColors.join(',')})` }
    : { backgroundColor: color };
};