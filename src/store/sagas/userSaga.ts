/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, select, takeLatest } from 'redux-saga/effects';

import ShopAPI, { GetProductsOptions } from '../../api';
import { ONE } from '../../constants/index';
import { convertFiltersToCategories } from '../../utils';
import {
  UserAction,
  ShopAction,
  UpdateUserFiltersAction,
  UpdateUserShopProductPageAction,
} from '../actions';
import { AppStateType, ShopProducts, User } from '../reducers';

function* workerUpdateUserFiltersSaga(action: UpdateUserFiltersAction) {
  const shopAPI = new ShopAPI();
  const shopAction = new ShopAction();
  const userAction = new UserAction();

  const user: User = yield select((state: AppStateType) => state.user);

  const options: GetProductsOptions = {
    page: ONE,
    size: user.shopProductsPageSize,
    category: convertFiltersToCategories(action.filters),
  };
  try {
    // @ts-ignore
    const response = yield call(shopAPI.getProducts, options);
    const shopProducts = response.data as ShopProducts;

    yield put(shopAction.setShopProducts(shopProducts));
    yield put(userAction.updateUserShopProductsPage(options.page!));
  } catch (err) {
    // TODO: Change in the future
    console.log(err);
  }
}

function* workerUpdateUserShopProductsSaga(action: UpdateUserShopProductPageAction) {
  const shopAPI = new ShopAPI();
  const shopAction = new ShopAction();

  const user: User = yield select((state: AppStateType) => state.user);

  const options: GetProductsOptions = {
    page: action.shopProductsPage,
    size: user.shopProductsPageSize,
    category: convertFiltersToCategories(user.filters),
  };

  try {
    // @ts-ignore
    const response = yield call(shopAPI.getProducts, options);
    const shopProducts = response.data as ShopProducts;

    yield put(shopAction.setShopProducts(shopProducts));
  } catch (err) {
    // TODO: Change in the future
    console.log(err);
  }
}

export function* watchUserSaga() {
  yield takeLatest(UserAction.UPDATE_USER_FILTERS, workerUpdateUserFiltersSaga);
  yield takeLatest(
    UserAction.UPDATE_USER_SHOP_PRODUCTS_PAGE,
    workerUpdateUserShopProductsSaga,
  );
}
