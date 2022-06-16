import { FC } from 'react';

import './style.css';
import { ButtonsProps } from './types';

export const Button: FC<ButtonsProps> = ({ type = 'default', children }) => {
  const className: string = type === 'primary' ? 'primary' : '';

  return (
    <button className={className} type="submit">
      {children}
    </button>
  );
};
