import { FC } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { ReturnComponentType } from './types';

import { HeaderNavigation } from 'components';
import { ROUTE } from 'constants/routes';
import { AllProducts, Checkout, HomePage } from 'containers/';

export const App: FC = (): ReturnComponentType => (
  <BrowserRouter>
    <div className="app-container">
      <HeaderNavigation />
      <Routes>
        <Route element={<HomePage />} path={ROUTE.HOME} />
        <Route element={<AllProducts />} path={ROUTE.ALL_PRODUCTS} />
        <Route element={<Checkout />} path={ROUTE.CHECKOUT} />
      </Routes>
    </div>
  </BrowserRouter>
);
