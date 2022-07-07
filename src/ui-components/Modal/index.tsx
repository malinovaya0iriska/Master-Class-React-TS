/* eslint-disable class-methods-use-this */
import React from 'react';

import ReactDOM from 'react-dom';

import { ReturnComponentType } from '../../types';

import { ModalProps } from './types';

import './style.css';

export class Modal extends React.Component<ModalProps> {
  root: HTMLDivElement;

  el: HTMLDivElement;

  constructor(props: ModalProps) {
    super(props);

    this.root = document.querySelector('#root') as HTMLDivElement;
    this.el = document.createElement('div');
  }

  componentDidMount(): void {
    this.root.appendChild(this.el);
  }

  componentWillUnmount(): void {
    this.root.removeChild(this.el);
  }

  removeOnClickPropagation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
  };

  onClickOutsideModalBody = (): void => {
    const { onClickOutsideModalBody } = this.props;

    // eslint-disable-next-line no-unused-expressions
    onClickOutsideModalBody && onClickOutsideModalBody();
  };

  render(): ReturnComponentType {
    const { show = true, modalBodyClassName, children } = this.props;
    return show
      ? ReactDOM.createPortal(
          <div
            onClick={this.removeOnClickPropagation}
            onKeyDown={() => this.removeOnClickPropagation}
            className="modal-container"
            role="presentation"
          >
            <div
              onClick={this.onClickOutsideModalBody}
              className="modal-overlay"
              onKeyDown={() => this.onClickOutsideModalBody}
              role="presentation"
            />
            <div className={`modal-body ${modalBodyClassName || ''}`}>{children}</div>
          </div>,
          this.el,
        )
      : null;
  }
}
