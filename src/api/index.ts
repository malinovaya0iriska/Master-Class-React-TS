/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { FIVE, ONE } from 'constants/index';

class ProductDetailsAPI {
  getProducts = (page?: number, size?: number) =>
    axios.get(`http://localhost:1234/products?page=${page || ONE}&size=${size || FIVE}`);
}

export default ProductDetailsAPI;
