/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, takeLatest } from 'redux-saga/effects';

import ShopAPI from 'api';
import { UserAction, ShopAction, UpdateUserFiltersAction } from 'store/actions';
import { ShopProducts } from 'store/reducers';
import { convertFiltersToCategories } from 'utils';

function* workerUpdateUserFiltersSaga(action: UpdateUserFiltersAction) {
  const shopAPI = new ShopAPI();
  const shopAction = new ShopAction();

  try {
    // @ts-ignore
    const response = yield call(shopAPI.getProducts, {
      category: convertFiltersToCategories(action.filters),
    });
    const shopProducts = response.data as ShopProducts;

    yield put(shopAction.setShopProducts(shopProducts));
  } catch (err) {
    // TODO: Change in the future
    console.log(err);
  }
}

export function* watchUserSaga() {
  yield takeLatest(UserAction.UPDATE_USER_FILTERS, workerUpdateUserFiltersSaga);
}
