import { call, put, takeEvery } from 'redux-saga/effects'

import * as actions from 'app/actions/channels';

function* requestEpisodes({ payload }) {
  try {
    const episodes = yield call(actions.asyncFetchChannels, payload);
    console.log(episodes)
    yield put(actions.requestChannelsSuccess(episodes));
  } catch (error) {
    console.log(error);
    yield put(actions.requestChannelsFail(error));
  }
}

export default function* feedcastSaga() {
  yield takeEvery(actions.CHANNELS_REQUESTED, requestEpisodes);
}
