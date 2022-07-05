import React from 'react';

import { ShoppingCartProductProps } from './types';

import { upperCaseFirstLetter } from 'utils';
import { getDiscountedPrice, parsePrice } from 'utils/product';
import './style.css';

export const ShoppingCartProduct: React.FC<ShoppingCartProductProps> = ({
  product,
  removeToCart,
}) => {
  const { title, image, size, color, quantity, discount, price } = product;

  const currentPrice = discount ? getDiscountedPrice(price, discount) : parsePrice(price);

  const subtotalPrice = currentPrice * quantity;

  const handleOnClickCloseButton = (): void => {
    removeToCart(product);
  };

  return (
    <div className="shopping-cart-product-container">
      <div className="image-container">
        <div style={{ backgroundImage: `url(${image})` }} className="product-image" />
      </div>
      <div className="product-details">
        <p className="product-name">{title}</p>
        <p>{size}</p>
        <p>{upperCaseFirstLetter(color)}</p>
        <p>QTY: {quantity}</p>
        <p className="sub-total">Subtotal: ${subtotalPrice}</p>
      </div>
      <div
        onClick={handleOnClickCloseButton}
        onKeyDown={() => handleOnClickCloseButton}
        role="button"
        className="close-button"
        tabIndex={0}
      >
        <i className="fa fa-times" aria-hidden="true" />
      </div>
    </div>
  );
};
