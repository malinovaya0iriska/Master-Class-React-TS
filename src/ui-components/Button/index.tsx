import React from 'react';

import { ButtonProps } from './interface';

import { ReturnComponentType } from 'types';

import './style.css';

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'default',
  selected,
  onClick,
  className,
}): ReturnComponentType => {
  const selectedClass = selected ? 'selected' : '';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn btn-${type} ${selectedClass} ${className || ''} `}
    >
      {children}
    </button>
  );
};
