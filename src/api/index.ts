/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { EMPTY_STRING } from 'constants/index';
import { ProductFilters } from 'store/reducers';

export interface GetProducsOptions {
  page?: number;
  size?: number;
  category?: string[];
}

export interface ProductFiltersAPIResponse {
  productFilters: ProductFilters;
}

class ShopAPI {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getProducts = (options: GetProducsOptions) => {
    const { page, size, category } = options;
    const pageQueryParam = `page=${page || EMPTY_STRING}`;
    const sizeQueryParam = `&size=${size || EMPTY_STRING}`;
    const categoryQueryParam = `&category=${
      category ? category.join('&category=') : EMPTY_STRING
    }`;
    return axios.get(
      `http://localhost:1234/products?${pageQueryParam}${sizeQueryParam}${categoryQueryParam}`,
    );
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getProductFilters = () => axios.get('http://localhost:1234/productFilters');
}

export default ShopAPI;
