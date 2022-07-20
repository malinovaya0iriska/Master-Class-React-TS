/* eslint-disable no-console */
/* eslint-disable default-case */
/* eslint-disable no-case-declarations */
import fs from 'fs';
import path from 'path';

import express from 'express';
import register from 'ignore-styles';
import { JSDOM } from 'jsdom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { createStore } from 'redux';
import serialize from 'serialize-javascript';

import ShopAPI, { GetProductsOptions } from '../src/api/index';
import HandleAllErrors from '../src/components/HandleAllErrors';
import { HeaderNavigation } from '../src/components/HeaderNavigation';
import { ROUTE } from '../src/constants/routes';
import AllProducts from '../src/containers/AllProducts';
import Checkout from '../src/containers/Checkout/index';
import ErrorPage from '../src/containers/ErrorPage';
import HomePage from '../src/containers/HomePage';
import { ThemeContextProvider } from '../src/context/ThemeContext';
import { AppStateType, rootReducer } from '../src/store/reducers/rootReducer';
import {
  Product,
  ProductFilters,
  shopInitialState,
  ShopProducts,
} from '../src/store/reducers/shopReducer';
import { userInitialState } from '../src/store/reducers/userReducer';

require.extensions['.css'] = () => undefined;

register(['css', '.scss']);

const app = express();

app.use('/public', express.static('build'));

const htmlFilePath = path.join(__dirname, '../build/index.html');
const htmlContent = fs.readFileSync(htmlFilePath, { encoding: 'utf-8' });

global.document = new JSDOM(htmlContent).window.document;

app.get('*', async (req, res) => {
  let bestSellerProducts: Product[] = [];
  let shopProducts: ShopProducts = {
    ...shopInitialState.shopProducts,
  };
  let productFilters: ProductFilters = {
    ...shopInitialState.productFilters,
  };

  const shopAPI = new ShopAPI();

  try {
    switch (req.url) {
      case ROUTE.HOME:
        const response = await shopAPI.getProducts({ category: ['best seller'] });
        const { products } = response.data as ShopProducts;
        bestSellerProducts = products;
        break;
      case ROUTE.ALL_PRODUCTS:
        const options: GetProductsOptions = {
          page: userInitialState.shopProductsPage,
          size: userInitialState.shopProductsPageSize,
        };

        const productsResponse = await shopAPI.getProducts(options);
        const productFiltersResponse = await shopAPI.getProductFilters();

        shopProducts = productsResponse.data as ShopProducts;
        productFilters = productFiltersResponse.data.productFilters as ProductFilters;
        break;
    }
  } catch (e) {
    console.error('Error:', e);
    console.error('Failed to fetch data for store');
  }

  const initialStoreState: AppStateType = {
    user: userInitialState,
    shop: {
      ...shopInitialState,
      bestSellerProducts,
      shopProducts,
      productFilters,
    },
  };

  const store = createStore(rootReducer, initialStoreState);

  const renderComponent = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <ThemeContextProvider>
          <HeaderNavigation />
          <HandleAllErrors>
            <Routes>
              <Route element={<Checkout />} path={ROUTE.CHECKOUT} />
              {/* @ts-ignore */}
              <Route element={<AllProducts />} path={ROUTE.ALL_PRODUCTS} />
              <Route element={<HomePage />} path={ROUTE.HOME} />
              <Route element={<ErrorPage />} path="*" />
            </Routes>
          </HandleAllErrors>
        </ThemeContextProvider>
      </StaticRouter>
    </Provider>,
  );

  res.send(
    htmlContent
      .replace('<div id="root"></div>', `<div id="root">${renderComponent}</div>`)
      .replace(
        'window.initialState=null',
        `window.initialState=${serialize(initialStoreState)}`,
      ),
  );
});

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
app.listen(5000);
