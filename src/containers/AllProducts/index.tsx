/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */

import { Component, ReactNode } from 'react';

import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';

import { ProductCard } from 'components';
import {
  AllProductsPageProps,
  AllProductsStateProps,
  AllProductsDispatchToProps,
} from 'containers/AllProducts/types';
import { UserAction, ShopAction } from 'store/actions';
import { AppStateType } from 'store/reducers';
import { ReturnComponentType } from 'types';
import './style.css';

class AllProducts extends Component<AllProductsPageProps> {
  componentDidMount(): void {
    const { shopProducts, fetchShopProductsAndFilters } = this.props;

    if (!shopProducts.products.length) {
      fetchShopProductsAndFilters();
    }
  }

  renderAllProductsList = (): ReactNode => {
    const { shopProducts } = this.props;
    return shopProducts
      ? shopProducts.products.map(({ title, variants, id }) => (
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          <ProductCard key={id} name={title} url={variants[0].image} />
        ))
      : null;
  };

  render(): ReturnComponentType {
    return (
      <div className="all-products-page-container">{this.renderAllProductsList()}</div>
    );
  }
}

const mapStateToProps: MapStateToProps<
  AllProductsStateProps,
  AllProductsStateProps,
  AppStateType
> = state => {
  const { shopProducts, productFilters } = state.shop;
  const { filters } = state.user;
  return {
    shopProducts,
    productFilters,
    userFilters: filters,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  AllProductsDispatchToProps,
  AllProductsStateProps
> = dispatch => {
  const { fetchShopProducts, fetchShopProductsAndFilters } = new ShopAction();
  const { updateUserFilters } = new UserAction();
  return {
    fetchShopProducts: options => dispatch(fetchShopProducts(options)),
    fetchShopProductsAndFilters: () => dispatch(fetchShopProductsAndFilters()),
    updateUserFilters: filters => dispatch(updateUserFilters(filters)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
