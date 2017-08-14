import { call, put, takeEvery } from 'redux-saga/effects'

import * as actions from 'app/actions/categories';

function* requestCategories({ payload }) {
  try {
    const data = yield call(actions.asyncFetchCategories, payload);
    console.log(data)
    yield put(actions.requestCategoriesSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(actions.requestCategoriesFail(error));
  }
}

function* requestCategoryInfo({ payload }) {
  try {
    const data = yield call(actions.asyncFetchCategories, payload);
    console.log(data)
    yield put(actions.requestChannelInfoSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(actions.requestCategoriesFail(error));
  }
}

export default function* feedcastSaga() {
  yield takeEvery(actions.CATEGORIES_REQUESTED, requestCategories);
  yield takeEvery(actions.CATEGORIES_INFO_REQUESTED, requestCategoryInfo);
}
