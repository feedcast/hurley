import { call, put, takeEvery } from 'redux-saga/effects'
import feedcastApi from 'feedcast-client';

import * as actions from 'app/actions/episodes';

function* requestEpisodes({ payload }) {
  try {
    const episodes = yield call(actions.asyncFetchEpisodes, payload);
    yield put(actions.requestEpisodesSuccess(episodes));
  } catch (error) {
    console.log(error);
    yield put(actions.requestEpisodesFail(error));
  }
}

function* requestEpisodesForChannel({ payload }) {
  try {
    const episodes = yield call(actions.asyncFetchChannelEpisodes, payload);
    yield put(actions.requestEpisodesSuccess(episodes));
  } catch (error) {
    console.log(error);
    yield put(actions.requestEpisodesFail(error));
  }
}

export default function* feedcastSaga() {
  yield takeEvery(actions.EPISODES_FETCH_ALL, requestEpisodes);
  yield takeEvery(actions.EPISODES_FETCH_MORE, requestEpisodes);
  yield takeEvery(actions.EPISODES_FETCH_FOR_CHANNEL, requestEpisodesForChannel);
}
