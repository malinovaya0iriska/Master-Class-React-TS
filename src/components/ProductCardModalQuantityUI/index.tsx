/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { ProductCardModalQuantityUIProps } from './types';

export const ProductCardModalQuantityUI: React.FC<ProductCardModalQuantityUIProps> = ({
  quantity,
  onClickAdd,
  onClickMinus,
}) => (
  <div className="quantity-container">
    <label className="quantity-container-label">
      <div>
        <i
          onClick={onClickMinus}
          onKeyDown={() => onClickMinus}
          className="fa fa-minus qty-button"
          role="button"
        />
      </div>
      <span className="qty-value">QTY {quantity}</span>
      <div>
        <i
          onClick={onClickAdd}
          role="button"
          onKeyDown={() => onClickAdd}
          className="fa fa-plus qty-button"
        />
      </div>
    </label>
  </div>
);
