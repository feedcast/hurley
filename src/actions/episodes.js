import feedcastApi from 'feedcast-client';

export const EPISODES_FETCH = 'EPISODES_FETCH';
export const EPISODES_FETCH_ALL = 'EPISODES_FETCH_ALL';
export const EPISODES_FETCH_MORE = 'EPISODES_FETCH_MORE';
export const EPISODES_FETCH_SUCCESS = 'EPISODES_FETCH_SUCCESS';
export const EPISODES_FETCH_FAIL = 'EPISODES_FETCH_FAIL';
export const EPISODES_FOR_PAGE = 'EPISODES_FOR_PAGE';
export const EPISODES_FETCH_FOR_CHANNEL = 'EPISODES_FETCH_FOR_CHANNEL';

export function requestAllEpisodes(params) {
  return {
    type: EPISODES_FETCH_ALL, payload: params
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

export function requestMoreEpisodes(params) {
  return {
    type: EPISODES_FETCH_MORE, payload: params
  }
}

export function requestEpisodesForPage(page) {
  return {
    type: EPISODES_FOR_PAGE, payload: page
  }
}

export function requestEpisodesForChannel(params) {
  return {
    type: EPISODES_FETCH_FOR_CHANNEL, payload: params
  }
}

export function syncRequestEpisodes(data) {
   return function (dispatch) {

    dispatch(requestAllEpisodes(data))


    return feedcastApi.getEpisodes(data)
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(episodes =>
        dispatch(requestEpisodesSuccess(episodes))
      )
  }
}

