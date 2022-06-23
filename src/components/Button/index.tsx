import { FC } from 'react';

import './style.css';
import { ButtonsProps } from './types';

export const Button: FC<ButtonsProps> = ({
  type = 'default',
  className,
  onClick,
  children,
}) => {
  const finalClassName = `${type === 'primary' ? 'primary' : ''} ${className}`;

  return (
    <button className={finalClassName} type="submit" onClick={onClick}>
      {children}
    </button>
  );
};
