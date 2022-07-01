/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { all } from 'redux-saga/effects';

import { watchShopSaga } from 'store/sagas/shopSaga';
import { watchUserSaga } from 'store/sagas/userSaga';

export default function* rootSaga() {
  yield all([watchShopSaga(), watchUserSaga()]);
}
