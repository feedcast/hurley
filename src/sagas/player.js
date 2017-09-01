import { call, put, takeEvery } from 'redux-saga/effects'
import feedcast from 'feedcast-client';

import * as actions from 'app/actions/player';

function* requestNextEpisodes({ payload }) {
  try {
    const { episode } = payload
    const episodes = yield call(feedcast.getNextEpisodes,{
      slug: episode.channel.slug,
      episode_slug: episode.slug,
      amount: 10
    });
    yield put(actions.requestEpisodesSuccess(episodes));
  } catch (error) {
    console.log(error);
    yield put(actions.requestEpisodesFail(error));
  }
}

export default function* feedcastSaga() {
  yield takeEvery(actions.PLAYER_REQUEST_MORE_EPISODES, requestNextEpisodes);
}
