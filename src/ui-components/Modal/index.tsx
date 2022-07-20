import { FC, MouseEvent, useEffect, useRef } from 'react';

import ReactDOM from 'react-dom';

import { ModalProps } from './types';

import { ReturnComponentType } from 'types';
import './style.css';

export const Modal: FC<ModalProps> = ({
  onClickOutsideModalBody,
  show = true,
  modalBodyClassName,
  children,
}): ReturnComponentType => {
  const root = useRef(document.querySelector('#root') as HTMLDivElement);
  const el = useRef(document.createElement('div'));

  const removeOnClickPropagation = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  };

  const handleClickOutsideModalBody = (): void => {
    // eslint-disable-next-line no-unused-expressions
    onClickOutsideModalBody && onClickOutsideModalBody();
  };

  useEffect(() => {
    root.current.appendChild(el.current);

    return () => {
      root.current.removeChild(el.current);
    };
  }, []);

  return show
    ? ReactDOM.createPortal(
        <div
          onClick={removeOnClickPropagation}
          onKeyDown={() => removeOnClickPropagation}
          className="modal-container"
          role="presentation"
        >
          <div
            onClick={handleClickOutsideModalBody}
            className="modal-overlay"
            onKeyDown={() => handleClickOutsideModalBody}
            role="presentation"
          />
          <div className={`modal-body ${modalBodyClassName || ''}`}>{children}</div>
        </div>,
        el.current,
      )
    : null;
};
