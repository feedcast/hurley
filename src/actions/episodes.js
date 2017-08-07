export const EPISODES_FETCH = 'EPISODES_FETCH';
export const EPISODES_FETCH_ALL = 'EPISODES_FETCH_ALL';
export const EPISODES_FETCH_SUCCESS = 'EPISODES_FETCH_SUCCESS';
export const EPISODES_FETCH_FAIL = 'EPISODES_FETCH_FAIL';

export function requestAllEpisodes() {
  return {
    type: EPISODES_FETCH_ALL, payload: { episode: null }
  }
}

export function requestEpisodesSuccess(episodes) {
  return {
    type: EPISODES_FETCH_SUCCESS, payload: { episodes }
  }
}

export function requestEpisodesFail(error) {
  return {
    type: EPISODES_FETCH_FAIL, payload: { error }
  }
}

export function requestEpisode(episode) {
  return {
    type: EPISODES_FETCH, payload: { episode }
  }
}
