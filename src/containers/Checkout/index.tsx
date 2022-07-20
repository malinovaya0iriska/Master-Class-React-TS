import { FC, ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { CheckoutPageProduct, CustomerInformation } from '../../components';
import { ROUTE } from '../../constants/routes';
import { getSubtotalPrice } from '../../utils/product';

import './style.css';
import { CartDetailsType } from './types';

import { ZERO } from 'constants/index';
import { useAppDispatch, useAppSelector } from 'store';
import { UserAction } from 'store/actions';
import { ReturnComponentType } from 'types';

const Checkout: FC = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector(state => state.user);
  const { cleanCart } = new UserAction();

  const getCartDetails = (): CartDetailsType => {
    const cartItems: ReactNode[] = [];
    let totalPrice = ZERO;

    cart.forEach((product, index) => {
      if (index) {
        // eslint-disable-next-line react/no-array-index-key
        cartItems.push(<div key={`divider-${index}`} className="divider" />);
      }
      cartItems.push(
        <CheckoutPageProduct
          product={product}
          key={`${product.productId}-${product.variantId}`}
        />,
      );

      totalPrice += getSubtotalPrice(product);
    });

    return {
      cartItems,
      totalPrice,
    };
  };
  const handleCleanCart = (): void => {
    dispatch(cleanCart());
  };

  const { cartItems, totalPrice } = getCartDetails();

  return cart.length ? (
    <div className="checkout-page-container">
      <div className="cart-items-container">
        <div className="cart-items-header">
          <p>Items: {cart.length}</p>
          <div className="shipping-container">
            <i className="fa fa-truck" aria-hidden="true" />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>Free Shipping</label>
          </div>
        </div>
        <div className="cart-items">{cartItems}</div>
        <div className="cart-items-footer">
          <div className="text">Total</div>
          <div className="total-price">${totalPrice}</div>
        </div>
      </div>
      <div className="customer-info">
        <CustomerInformation cart={cart} cleanCart={handleCleanCart} />
      </div>
    </div>
  ) : (
    <Navigate to={ROUTE.HOME} />
  );
};

export default Checkout;
