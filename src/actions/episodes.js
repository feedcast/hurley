export const EPISODES_FETCH = 'EPISODES_FETCH';
export const EPISODES_FETCH_ALL = 'EPISODES_FETCH_ALL';
export const EPISODES_FETCH_SUCCESS = 'EPISODES_FETCH_SUCCESS';
export const EPISODES_FETCH_FAIL = 'EPISODES_FETCH_FAIL';
export const EPISODES_FOR_PAGE = 'EPISODES_FOR_PAGE';

export function requestAllEpisodes({page=1, perPage=30}) {
  return {
    type: EPISODES_FETCH_ALL, payload: { page, per_page: perPage }
  }
}

export function requestEpisodesSuccess(data) {
  return {
    type: EPISODES_FETCH_SUCCESS, payload: data
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

export function changeEpisodesForPage(page) {
  return {
    type: EPISODES_FOR_PAGE, payload: page
  }
}

