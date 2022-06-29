/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { call, put, takeEvery } from 'redux-saga/effects';

import ProductDetailsAPI from 'api/index';
import { ProductDetailsAction } from 'store/actions';
import { ProductDetails } from 'store/reducers';

function* workerFetchProductsDetailsSaga(): any {
  const productDetailsAPI = new ProductDetailsAPI();
  const productDetailsAction = new ProductDetailsAction();

  try {
    const response: any = yield call(productDetailsAPI.getProducts);
    const productDetails = response.data as ProductDetails;
    yield put(productDetailsAction.set(productDetails));
  } catch (err) {
    // TODO change error handling
    console.log('err');
  }
}

export function* watchProductDetailsSaga(): any {
  yield takeEvery(
    ProductDetailsAction.FETCH_PRODUCTS_DETAILS,
    workerFetchProductsDetailsSaga,
  );
}
