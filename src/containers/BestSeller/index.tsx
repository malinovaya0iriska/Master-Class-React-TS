/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Component, ReactNode } from 'react';

import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';

import { BestSellerProps, BestSellerStateProps, BestSellerDispatchProps } from './types';

import { ProductCard } from 'components';
import { ShopAction } from 'store/actions';
import { AppStateType } from 'store/reducers';
import './style.css';
import { ReturnComponentType } from 'types';

class BestSeller extends Component<BestSellerProps> {
  componentDidMount(): void {
    const { bestSellerProducts, fetchAllBestSellerProducts } = this.props;
    if (!bestSellerProducts.length) {
      fetchAllBestSellerProducts();
    }
  }

  renderBestSellerProducts = (): ReactNode => {
    const { bestSellerProducts } = this.props;

    return bestSellerProducts.map(({ title, id, variants }) => (
      <ProductCard key={id} url={variants[0].image} name={title} />
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

  return {
    fetchAllBestSellerProducts: () => dispatch(fetchAllBestSellerProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BestSeller);
