import React from 'react';

import { ProductCardModalPriceUIProps } from './types';

import { getDiscountedPrice } from 'utils/product';

export const ProductCardModalPriceUI: React.FC<ProductCardModalPriceUIProps> = ({
  selectedVariant,
}) => {
  const { discount, price } = selectedVariant;

  const priceUI = (
    <p className="price-ui">
      {discount ? (
        <>
          <del className="old-price">{price}</del>
          <ins>${getDiscountedPrice(price, discount)}</ins>
        </>
      ) : (
        <ins>{price}</ins>
      )}
    </p>
  );

  return priceUI;
};
