import { FC, lazy, Suspense } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { ReturnComponentType } from './types';

import { HandleAllErrors, HeaderNavigation } from 'components';
import { ROUTE } from 'constants/routes';
import { ErrorPage } from 'containers';
import { ThemeContextProvider } from 'context/ThemeContext';
import { store } from 'store';

(window as any).shopspree = store;

const HomePage = lazy(() => import('./containers/HomePage/index'));
const AllProducts = lazy(() => import('./containers/AllProducts/index'));
const Checkout = lazy(() => import('./containers/Checkout/index'));

export const App: FC = (): ReturnComponentType => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeContextProvider>
        <HeaderNavigation />
        <HandleAllErrors>
          <Routes>
            <Route
              path={ROUTE.HOME}
              element={
                <Suspense fallback={null}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path={ROUTE.ALL_PRODUCTS}
              element={
                <Suspense fallback={null}>
                  {/* @ts-ignore */}
                  <AllProducts />
                </Suspense>
              }
            />
            <Route
              path={ROUTE.CHECKOUT}
              element={
                <Suspense fallback={null}>
                  <Checkout />
                </Suspense>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </HandleAllErrors>
      </ThemeContextProvider>
    </BrowserRouter>
  </Provider>
);
