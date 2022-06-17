import { FC } from 'react';

import './style.css';
import { ButtonsProps } from './types';

export const Button: FC<ButtonsProps> = ({ type, children }) => {
  const className = type || 'default';

  return (
    <button className={className} type="submit">
      {children}
    </button>
  );
};
