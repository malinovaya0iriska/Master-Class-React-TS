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

const BASE_URL = 'http://localhost:1234';
class ShopAPI {
  getProducts = (options: GetProductsOptions) => {
    const { page, size, category } = options;

    const pageQueryParam = `page=${page || EMPTY_STRING}`;
    const sizeQueryParam = `&size=${size || EMPTY_STRING}`;
    const categoryQueryParam = `&category=${
      category ? category.join('&category=') : EMPTY_STRING
    }`;
    return axios.get(
      `${BASE_URL}/product/all?${pageQueryParam}${sizeQueryParam}${categoryQueryParam}`,
    );
  };

  getProductFilters = () => axios.get(`${BASE_URL}/product/filters`);

  postOrder = (order: Order) => {
    const body = {
      order,
    };

    return axios.post(`${BASE_URL}/order`, body);
  };
}

export default ShopAPI;
