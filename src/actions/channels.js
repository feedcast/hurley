import feedcast from 'feedcast-client';

export const CHANNELS_REQUESTED = 'CHANNELS_REQUESTED';
export const CHANNELS_FETCH_SUCCESS = 'CHANNELS_FETCH_SUCCESS';
export const CHANNELS_FETCH_FAIL = 'CHANNELS_FETCH_FAIL';

export function asyncFetchChannels(params) {
  debugger;
  return feedcast.getChannels(params);
}

export function requestChannels({ page, perPage }) {
  return {
    type: CHANNELS_REQUESTED,
    payload: { page, per_page: perPage }
  };
}

export function requestChannelsSuccess(data) {
  return {
    type: CHANNELS_FETCH_SUCCESS,
    payload: data,
  };
}

export function requestChannelsFail(error) {
  return {
    type: CHANNELS_FETCH_FAIL,
    payload: {error},
  };
}
