import React from 'react';

import { ProductCardProps, ProductCardState } from './types';

import { ProductCardModal } from 'components';
import { ThemeContext } from 'context/ThemeContext';
import { ProductPurchase } from 'store/reducers';
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

  handleAddToCart = (product: ProductPurchase): void => {
    const { addToCart } = this.props;

    addToCart(product);
    this.setState({ showDetails: false });
  };

  render(): ReturnComponentType {
    const { showDetails } = this.state;
    const { product } = this.props;
    const { initialVariant, variants, variantsOptionsAvailable } =
      getProductVariantDetails(product);
    return (
      <ThemeContext.Consumer>
        {theme =>
          initialVariant ? (
            <div
              role="presentation"
              onClick={this.onClickProductCard}
              className={`product-card-container ${theme}`}
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
                addToCart={this.handleAddToCart}
              />
            </div>
          ) : null
        }
      </ThemeContext.Consumer>
    );
  }
}
