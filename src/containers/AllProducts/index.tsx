/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */

import { Component, ReactNode } from 'react';

import { connect, MapStateToProps } from 'react-redux';

import { ProductCard } from 'components';
import {
  AllProductsPageProps,
  AllProductsStateProps,
} from 'containers/AllProducts/types';
import { AppStateType } from 'store/reducers';
import { ReturnComponentType } from 'types';
import './style.css';

class AllProducts extends Component<AllProductsPageProps> {
  constructor(props: AllProductsPageProps) {
    super(props);
  }

  // componentDidMount(): void {
  //   const { productDetails } = this.props;

  //   if (!productDetails.products.length) {
  //     this.props.fetchShopProducts({});
  //   }
  // }

  renderAllProductsList = (): ReactNode => {
    const { productDetails } = this.props;
    return productDetails
      ? productDetails.products.map(({ title, variants, id }) => (
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          <ProductCard key={id} name={title} url={variants[0].image} />
        ))
      : null;
  };

  render(): ReturnComponentType {
    return (
      <div className="all-products-page-container">
        All Products {this.renderAllProductsList()}
      </div>
    );
  }
}

const mapStatetoProps: MapStateToProps<
  AllProductsStateProps,
  AllProductsStateProps,
  AppStateType
> = state => ({
  productDetails: state.productDetails,
});

export default connect(mapStatetoProps)(AllProducts);
