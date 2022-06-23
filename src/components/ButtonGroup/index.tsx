import React, { FC } from 'react';

import { ButtonGroupProps } from './types';

export const ButtonGroup: FC<ButtonGroupProps> = ({ children }) => (
  <>
    {React.Children.map(children, (child, index) =>
      React.isValidElement(child)
        ? React.cloneElement(child, {
            className: 'btn-group',
            onClick: () => console.log(index),
          })
        : child,
    )}
  </>
);
