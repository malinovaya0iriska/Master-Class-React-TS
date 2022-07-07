/* eslint-disable no-unused-expressions */
import React, { ReactNode } from 'react';

import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Link } from 'react-router-dom';

import { ShoppingCartProduct } from '../../components';
import { ONE } from '../../constants/index';
import { ROUTE } from '../../constants/routes';
import { UserAction } from '../../store/actions';
import { AppStateType, ProductPurchase } from '../../store/reducers';
import { ReturnComponentType } from '../../types';
import { Popover, Button } from '../../ui-components';

import {
  ShoppingCartDispatchProps,
  ShoppingCartOwnProps,
  ShoppingCartProps,
  ShoppingCartState,
  ShoppingCartStateProps,
} from './types';
import './style.css';

class ShoppingCart extends React.Component<ShoppingCartProps, ShoppingCartState> {
  constructor(props: ShoppingCartProps) {
    super(props);

    this.state = {
      showPopover: false,
    };
  }

  handlePopoverClick = (): void => {
    const { cart } = this.props;
    const { showPopover } = this.state;

    cart.length && this.setState({ showPopover: !showPopover });
  };

  handleRemoveToCart = (product: ProductPurchase): void => {
    const { cart, removeToCart } = this.props;
    cart.length === ONE && this.setState({ showPopover: false });
    removeToCart(product);
  };

  getAllProducts = (): ReactNode => {
    const { cart } = this.props;
    return cart.map(product => (
      <ShoppingCartProduct
        key={`${product.productId}-${product.variantId}`}
        product={product}
        removeToCart={this.handleRemoveToCart}
      />
    ));
  };

  render(): ReturnComponentType {
    const { cart } = this.props;
    const { showPopover } = this.state;
    const cartLength = cart.length;

    const notificationUI = cartLength ? (
      <div className="shop-cart-notification">{cartLength}</div>
    ) : null;

    const popoverContent = (
      <div className="shopping-cart-container-popover">
        <div className="shopping-cart-all-products">{this.getAllProducts()}</div>
        <Link to={ROUTE.CHECKOUT}>
          <Button
            className="checkout-button"
            styleType="primary"
            onClick={this.handlePopoverClick}
          >
            Checkout
          </Button>
        </Link>
      </div>
    );

    return (
      <Popover
        controlShow={showPopover}
        onClick={this.handlePopoverClick}
        position="bottomleft"
        content={popoverContent}
      >
        <div className="shopping-cart-container">
          <i className="nav-item fa fa-shopping-cart" />
          {notificationUI}
        </div>
      </Popover>
    );
  }
}

const mapStateToProps: MapStateToProps<
  ShoppingCartStateProps,
  ShoppingCartOwnProps,
  AppStateType
> = state => {
  const { cart } = state.user;

  return {
    cart,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  ShoppingCartDispatchProps,
  ShoppingCartOwnProps
> = dispatch => {
  const { removeToCart } = new UserAction();

  return {
    removeToCart: productPurchase => dispatch(removeToCart(productPurchase)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
