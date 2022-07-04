/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from 'react';

import { ProductCardModalProps, ProductCardModalState } from './interface';

import {
  ProductCardModalPriceUI,
  ProductCardModalQuantityUI,
  ProductCardModalVariantOptions,
} from 'components';
import { ReturnComponentType } from 'types';
import { Button, Modal } from 'ui-components';
import './style.css';

export class ProductCardModal extends React.Component<
  ProductCardModalProps,
  ProductCardModalState
> {
  constructor(props: ProductCardModalProps) {
    super(props);

    this.state = {
      selectedVariant: props.initialVariant,
      quantity: 1,
    };
  }

  handleClickQuantityAddButton = (): void => {
    const { quantity, selectedVariant } = this.state;

    selectedVariant.stock > quantity && this.setState({ quantity: quantity + 1 });
  };

  handleClickQuantityMinusButton = (): void => {
    const { quantity } = this.state;

    quantity > 1 && this.setState({ quantity: quantity - 1 });
  };

  handleSizeChange = (size: string): void => {
    const { selectedVariant } = this.state;
    const { variants } = this.props;

    if (selectedVariant.size !== size) {
      this.setState({
        selectedVariant: variants.filter(
          variant => variant.size === size && variant.stock > 0,
        )[0],
      });
    }
  };

  handleColorChange = (color: string): void => {
    const { selectedVariant } = this.state;
    const { variants } = this.props;

    if (selectedVariant.color !== color) {
      this.setState({
        selectedVariant: variants.filter(
          variant =>
            variant.size === selectedVariant.size &&
            variant.color === color &&
            variant.stock > 0,
        )[0],
      });
    }
  };

  handleAddToCart = (): void => {
    const { selectedVariant, quantity } = this.state;
    const { addToCart } = this.props;
    addToCart({ ...selectedVariant, quantity });
  };

  render(): ReturnComponentType {
    const { show, onClickOutsideModalBody, variants, variantsOptionsAvailable } =
      this.props;
    const { selectedVariant, quantity } = this.state;
    const { title, image } = selectedVariant;

    return (
      <Modal
        onClickOutsideModalBody={onClickOutsideModalBody}
        modalBodyClassName="product-card-modal-body"
        show={show}
      >
        <div className="modal-product-details-container">
          <div className="modal-product-image-container">
            <div
              style={{ backgroundImage: `url(${image})` }}
              className="modal-product-image"
            />
          </div>
          <div className="modal-product-details">
            <p className="modal-product-name">{title}</p>
            <ProductCardModalPriceUI selectedVariant={selectedVariant} />
            <ProductCardModalQuantityUI
              quantity={quantity}
              onClickAdd={this.handleClickQuantityAddButton}
              onClickMinus={this.handleClickQuantityMinusButton}
            />
            <ProductCardModalVariantOptions
              selectedVariant={selectedVariant}
              variants={variants}
              onSizeChange={this.handleSizeChange}
              onColorChange={this.handleColorChange}
              variantsOptionsAvailable={variantsOptionsAvailable}
            />
            <Button
              styleType="primary"
              onClick={this.handleAddToCart}
              className="add-to-cart-button"
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}
