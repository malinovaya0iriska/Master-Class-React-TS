import { Component, ReactNode } from 'react';

import { connect, MapStateToProps } from 'react-redux';
import { Navigate } from 'react-router-dom';

import {
  CartDetailsType,
  CheckoutOwnProps,
  CheckoutPageProps,
  CheckoutStateProps,
} from './types';

import { CheckoutPageProduct } from 'components';
import { ROUTE } from 'constants/routes';
import { AppStateType } from 'store/reducers';
import { ReturnComponentType } from 'types';
import { getSubtotalPrice } from 'utils/product';
import './style.css';

class Checkout extends Component<CheckoutPageProps> {
  getCartDetails = (): CartDetailsType => {
    const { cart } = this.props;

    const cartItems: ReactNode[] = [];
    let totalPrice = 0;

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

  render(): ReturnComponentType {
    const { cart } = this.props;
    const { cartItems, totalPrice } = this.getCartDetails();

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
            <div>Total</div>
            <div className="total-price">${totalPrice}</div>
          </div>
        </div>
        <div className="customer-info" />
      </div>
    ) : (
      <Navigate to={ROUTE.HOME} />
    );
  }
}

const mapStateToProps: MapStateToProps<
  CheckoutStateProps,
  CheckoutOwnProps,
  AppStateType
> = state => {
  const { cart } = state.user;
  return {
    cart,
  };
};

export default connect(mapStateToProps)(Checkout);
