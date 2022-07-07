import React from 'react';

import { ReturnComponentType } from '../../types';

import { ButtonProps, DefaultButtonPropsType } from './types';

import './style.css';

// eslint-disable-next-line no-undef
export const Button: React.FC<DefaultButtonPropsType & ButtonProps> = ({
  children,
  styleType = 'default',
  selected,
  onClick,
  className,
  ...props
}): ReturnComponentType => {
  const selectedClass = selected ? 'selected' : '';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn btn-${styleType} ${selectedClass} ${className || ''} `}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </button>
  );
};
