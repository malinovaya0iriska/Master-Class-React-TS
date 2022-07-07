/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { EMPTY_STRING } from '../constants/index';
import { CustomerInformationFieldsList } from '../constants/user';
import { ProductFilters, ProductPurchase } from '../store/reducers';

export interface GetProductsOptions {
  page?: number;
  size?: number;
  category?: string[];
}

export interface ProductFiltersAPIResponse {
  productFilters: ProductFilters;
}

export interface Order {
  cart: ProductPurchase[];
  user: CustomerInformationFieldsList;
}

class ShopAPI {
  getProducts = (options: GetProductsOptions) => {
    const { page, size, category } = options;

    const pageQueryParam = `page=${page || EMPTY_STRING}`;
    const sizeQueryParam = `&size=${size || EMPTY_STRING}`;
    const categoryQueryParam = `&category=${
      category ? category.join('&category=') : EMPTY_STRING
    }`;
    return axios.get(
      `http://localhost:1234/product/all?${pageQueryParam}${sizeQueryParam}${categoryQueryParam}`,
    );
  };

  getProductFilters = () => axios.get('http://localhost:1234/product/filters');

  postOrder = (order: Order) => {
    const body = {
      order,
    };

    return axios.post('http://localhost:1234/order', body);
  };
}

export default ShopAPI;
