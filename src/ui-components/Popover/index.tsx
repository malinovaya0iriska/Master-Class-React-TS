/* eslint-disable no-unused-expressions */
import {
  cloneElement,
  CSSProperties,
  FC,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
  useState,
} from 'react';

import ReactDOM from 'react-dom';

import { PopoverChildrenPosition, PopoverProps } from './types';

import { ZERO } from 'constants/index';
import { useLayoutEffectOnUpdate } from 'hooks';
import { ReturnComponentType } from 'types';
import './style.css';

export const Popover: FC<PopoverProps> = ({
  children,
  controlShow,
  onClick,
  content,
  position,
  popoverBodyClassName,
}): ReturnComponentType => {
  const root = useRef(document.querySelector('#root') as HTMLDivElement);
  const el = useRef(document.createElement('div'));
  const childrenRef = useRef<HTMLElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState(false);
  const [contentWidth, setContentWidth] = useState(ZERO);
  const [childrenPosition, setChildrenPosition] = useState<PopoverChildrenPosition>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const getShowValue = (): boolean => (controlShow === undefined ? show : controlShow);

  const handleContentClick = (): void => {
    controlShow === undefined && setShow(!show);

    onClick && onClick();
  };

  useEffect(() => {
    root.current.appendChild(el.current);
    setTimeout(() => {
      const childrenElement = childrenRef.current;

      if (childrenElement) {
        const { top, left, right, bottom } = childrenElement.getBoundingClientRect();

        setChildrenPosition({
          top,
          left,
          bottom,
          right,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 500);

    return () => {
      root.current.removeChild(el.current);
    };
  }, []);

  useLayoutEffectOnUpdate(() => {
    const popperWidth = popperRef.current
      ? popperRef.current.getBoundingClientRect().width
      : ZERO;

    if ((!contentWidth || popperWidth !== contentWidth) && getShowValue()) {
      setContentWidth(popperWidth);
    }
  });

  const renderChildElement = (): ReactNode =>
    cloneElement(children as ReactElement, {
      ref: childrenRef,
      onClick: handleContentClick,
    });

  const renderPopover = (): ReactPortal | null => {
    let style: CSSProperties;

    // eslint-disable-next-line default-case
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

    return getShowValue()
      ? ReactDOM.createPortal(
          <div style={style} className="popover-content-container" ref={popperRef}>
            <div className={`popover-body ${popoverBodyClassName || ''}`}>{content}</div>
          </div>,
          el.current,
        )
      : null;
  };

  return (
    <>
      {renderChildElement()}
      {renderPopover()}
    </>
  );
};
