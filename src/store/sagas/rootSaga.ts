/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { all } from 'redux-saga/effects';

import { watchShopSaga } from './shopSaga';
import { watchUserSaga } from './userSaga';

export default function* rootSaga() {
  yield all([watchShopSaga(), watchUserSaga()]);
}
