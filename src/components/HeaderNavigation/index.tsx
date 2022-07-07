import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { ROUTE } from '../../constants/routes';
import './style.css';
import { ShoppingCart } from '../../containers';

export const HeaderNavigation: FC = () => (
  <div className="header-nav-container">
    <div className="nav-items-left">
      <NavLink className="nav-item shopname" to={ROUTE.HOME}>
        Shopspree
      </NavLink>
      <NavLink className="nav-item" to={ROUTE.ALL_PRODUCTS}>
        All Products
      </NavLink>
    </div>
    <div className="nav-items-right">
      <ShoppingCart />
    </div>
  </div>
);
