/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
import React, { ReactNode } from 'react';

import ReactDOM from 'react-dom';

import { ReturnComponentType } from '../../types';

import { PopoverProps, PopoverState } from './types';

import './style.css';

export class Popover extends React.Component<PopoverProps, PopoverState> {
  root: HTMLDivElement;

  el: HTMLDivElement;

  childrenRef: React.RefObject<HTMLElement>;

  popperRef: React.RefObject<HTMLDivElement>;

  constructor(props: PopoverProps) {
    super(props);

    this.root = document.querySelector('#root') as HTMLDivElement;
    this.el = document.createElement('div');
    this.childrenRef = React.createRef();
    this.popperRef = React.createRef();

    this.state = {
      show: false,
      childrenPosition: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      contentWidth: 0,
    };
  }

  componentDidMount(): void {
    this.root.appendChild(this.el);

    setTimeout(() => {
      const childrenElement = this.childrenRef.current;

      if (childrenElement) {
        const { top, left, right, bottom } = childrenElement.getBoundingClientRect();

        this.setState({
          childrenPosition: {
            top,
            left,
            bottom,
            right,
          },
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 500);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(_prevProps: PopoverProps, _prevState: PopoverState): void {
    const { contentWidth } = this.state;
    const popperWidth = this.popperRef.current
      ? this.popperRef.current.getBoundingClientRect().width
      : // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        0;

    if ((!contentWidth || popperWidth !== contentWidth) && this.getShowValue()) {
      this.setState({
        contentWidth: popperWidth,
      });
    }
  }

  componentWillUnmount(): void {
    this.root.removeChild(this.el);
  }

  renderChildElement = (): ReactNode => {
    const { children } = this.props;
    return React.cloneElement(children as React.ReactElement, {
      ref: this.childrenRef,
      onClick: this.handleContentClick,
    });
  };

  getShowValue = (): boolean => {
    const { controlShow } = this.props;
    const { show } = this.state;

    return controlShow === undefined ? show : controlShow;
  };

  handleContentClick = (): void => {
    const { controlShow, onClick } = this.props;
    const { show } = this.state;

    controlShow === undefined && this.setState({ show: !show });

    onClick && onClick();
  };

  renderPopover = (): React.ReactPortal | null => {
    const { content, position, popoverBodyClassName } = this.props;
    const { childrenPosition, contentWidth } = this.state;
    let style: React.CSSProperties;

    switch (position) {
      case 'bottomleft':
        style = {
          top: childrenPosition.bottom,
          left: childrenPosition.right - contentWidth,
        };
        break;
      case 'bottomright':
        style = {
          top: childrenPosition.bottom,
          left: childrenPosition.left,
        };
        break;
    }

    return this.getShowValue()
      ? ReactDOM.createPortal(
          <div style={style} className="popover-content-container" ref={this.popperRef}>
            <div className={`popover-body ${popoverBodyClassName || ''}`}>{content}</div>
          </div>,
          this.el,
        )
      : null;
  };

  render(): ReturnComponentType {
    return (
      <>
        {this.renderChildElement()}
        {this.renderPopover()}
      </>
    );
  }
}
