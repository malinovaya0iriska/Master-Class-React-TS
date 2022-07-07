import React from 'react';

import { upperCaseFirstLetter } from '../../utils';
import { getSubtotalPrice } from '../../utils/product';

import { ShoppingCartProductProps } from './types';
import './style.css';

export const ShoppingCartProduct: React.FC<ShoppingCartProductProps> = ({
  product,
  removeToCart,
}) => {
  const { title, image, size, color, quantity } = product;

  const subtotalPrice = getSubtotalPrice(product);

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
