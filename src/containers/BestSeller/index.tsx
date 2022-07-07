/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Component, ReactNode } from 'react';

import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';

import { ProductCard } from '../../components';
import { ShopAction, UserAction } from '../../store/actions';
import { AppStateType, Product, ProductPurchase } from '../../store/reducers';
import './style.css';
import { ReturnComponentType } from '../../types';

import { BestSellerProps, BestSellerStateProps, BestSellerDispatchProps } from './types';

class BestSeller extends Component<BestSellerProps> {
  componentDidMount(): void {
    const { bestSellerProducts, fetchAllBestSellerProducts } = this.props;
    if (!bestSellerProducts.length) {
      fetchAllBestSellerProducts();
    }
  }

  renderBestSellerProducts = (): ReactNode => {
    const { bestSellerProducts, addToCart } = this.props;

    return bestSellerProducts.map((product: Product) => (
      <ProductCard key={product.id} product={product} addToCart={addToCart} />
    ));
  };

  render(): ReturnComponentType {
    return (
      <div className="best-seller-container">
        <h2>Best Seller</h2>
        <div className="best-seller-products">{this.renderBestSellerProducts()}</div>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<
  BestSellerStateProps,
  {},
  AppStateType
> = state => ({
  bestSellerProducts: state.shop.bestSellerProducts,
});

const mapDispatchToProps: MapDispatchToPropsFunction<
  BestSellerDispatchProps,
  {}
> = dispatch => {
  const { fetchAllBestSellerProducts } = new ShopAction();
  const { addToCart } = new UserAction();

  return {
    fetchAllBestSellerProducts: () => dispatch(fetchAllBestSellerProducts()),
    addToCart: (productPurchase: ProductPurchase) => dispatch(addToCart(productPurchase)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BestSeller);
