import { call, put, takeEvery } from 'redux-saga/effects'

import * as actions from 'app/actions/channels';

function* requestChannels({ payload }) {
  try {
    const data = yield call(actions.asyncFetchChannels, payload);
    yield put(actions.requestChannelsSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(actions.requestChannelsFail(error));
  }
}

function* requestChannelInfo({ payload }) {
  try {
    const data = yield call(actions.asyncFetchChannels, payload);
    yield put(actions.requestChannelInfoSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(actions.requestChannelsFail(error));
  }
}

export default function* feedcastSaga() {
  yield takeEvery(actions.CHANNELS_REQUESTED, requestChannels);
  yield takeEvery(actions.CHANNELS_INFO_REQUESTED, requestChannelInfo);
}
