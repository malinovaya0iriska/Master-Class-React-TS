import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import { ModalProps } from 'components/Modal/types';
import { ReturnComponentType } from 'types';
import './style.css';

export class Modal extends Component<ModalProps> {
  el: HTMLDivElement;

  root: HTMLElement;

  constructor(props: ModalProps) {
    super(props);

    this.root = document.querySelector('#root') as HTMLElement;
    this.el = document.createElement('div');
  }

  componentDidMount(): void {
    this.root?.appendChild(this.el);
  }

  componentWillUnmount(): void {
    this.root?.removeChild(this.el);
  }

  handleCloseModalContainer = (): void => {
    const { onClose } = this.props;
    console.log('Modal Click');
    onClose();
  };

  handleClickModalContainer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    console.log(this.el);

    e.stopPropagation();
  };

  render(): ReturnComponentType {
    const { show = true } = this.props;

    return show
      ? ReactDOM.createPortal(
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            className="modal-container"
            onClick={this.handleClickModalContainer}
            onKeyUp={() => {}}
            // eslint-disable-next-line jsx-a11y/aria-role
            role="modal"
          >
            <div className="modal-overlay" />{' '}
            <div className="modal-body">
              <h3>Modal</h3>
              <button
                onClick={this.handleCloseModalContainer}
                className="modal-button"
                type="button"
              >
                Close button
              </button>
            </div>
          </div>,
          this.el,
        )
      : null;
  }
}
