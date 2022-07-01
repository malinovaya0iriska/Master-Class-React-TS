/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { all } from 'redux-saga/effects';

import { watchShopSaga } from 'store/sagas';

export default function* rootSaga() {
  yield all([watchShopSaga()]);
}
