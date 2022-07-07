/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */

import { Component, ReactNode } from 'react';

import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';

import { AllProductsSideBar, ProductCard, Pagination } from 'components';
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
    const { shopProducts, addToCart } = this.props;
    return shopProducts.products.map(product => (
      <div key={product.id} className="product-item-container">
        <ProductCard product={product} addToCart={addToCart} />
      </div>
    ));
  };

  handlePageChange = (selectedPage: number): void => {
    const { userSelectedPage, updateUserShopProductsPage } = this.props;
    if (selectedPage !== userSelectedPage) {
      updateUserShopProductsPage(selectedPage);
    }
  };

  render(): ReturnComponentType {
    const {
      productFilters,
      userFilters,
      updateUserFilters,
      shopProducts,
      userSelectedPage,
    } = this.props;
    return (
      <div className="all-products-page-container">
        <AllProductsSideBar
          onUpdateUserFilters={updateUserFilters}
          userFilters={userFilters}
          productFilters={productFilters}
        />

        <div className="all-products-container">
          <div className="all-products">{this.renderAllProductsList()}</div>
          <Pagination
            overrideSelectedPage={userSelectedPage}
            onChange={this.handlePageChange}
            numberOfPages={shopProducts.totalPages}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<
  AllProductsStateProps,
  {},
  AppStateType
> = state => {
  const { shopProducts, productFilters } = state.shop;
  const { filters, shopProductsPage } = state.user;
  return {
    shopProducts,
    productFilters,
    userFilters: filters,
    userSelectedPage: shopProductsPage,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  AllProductsDispatchToProps,
  AllProductsStateProps
> = dispatch => {
  const { fetchShopProducts, fetchShopProductsAndFilters } = new ShopAction();
  const { updateUserFilters, updateUserShopProductsPage, addToCart } = new UserAction();
  return {
    fetchShopProducts: options => dispatch(fetchShopProducts(options)),
    fetchShopProductsAndFilters: () => dispatch(fetchShopProductsAndFilters()),
    updateUserFilters: filters => dispatch(updateUserFilters(filters)),
    updateUserShopProductsPage: shopProductsPage =>
      dispatch(updateUserShopProductsPage(shopProductsPage)),
    addToCart: productPurchase => dispatch(addToCart(productPurchase)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
