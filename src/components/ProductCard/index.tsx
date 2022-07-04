import React from 'react';

import { ProductCardProps, ProductCardState } from './interface';

import { ProductCardModal } from 'components';
import { ReturnComponentType } from 'types';
import { getProductVariantDetails } from 'utils/product';

import './style.css';

export class ProductCard extends React.Component<ProductCardProps, ProductCardState> {
  constructor(props: ProductCardProps) {
    super(props);
    this.state = {
      showDetails: false,
    };
  }

  onClickProductCard = (): void => {
    this.setState({ showDetails: true });
  };

  onClickOutsideModalBody = (): void => {
    this.setState({ showDetails: false });
  };

  render(): ReturnComponentType {
    const { showDetails } = this.state;
    const { product, addToCart } = this.props;
    const { initialVariant, variants, variantsOptionsAvailable } =
      getProductVariantDetails(product);

    return initialVariant ? (
      <div
        onClick={this.onClickProductCard}
        onKeyDown={() => this.onClickProductCard}
        className="product-card-container"
        role="presentation"
      >
        <div
          style={{ backgroundImage: `url(${initialVariant.image})` }}
          className="product-image"
        />
        <div className="product-details">
          <p>{initialVariant.title}</p>
        </div>
        <ProductCardModal
          onClickOutsideModalBody={this.onClickOutsideModalBody}
          show={showDetails}
          initialVariant={initialVariant}
          variants={variants}
          variantsOptionsAvailable={variantsOptionsAvailable}
          addToCart={addToCart}
        />
      </div>
    ) : null;
  }
}
