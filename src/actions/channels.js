import feedcast from 'feedcast-client';

export const CHANNELS_REQUESTED = 'CHANNELS_REQUESTED';
export const CHANNELS_FETCH_SUCCESS = 'CHANNELS_FETCH_SUCCESS';
export const CHANNELS_FETCH_FAIL = 'CHANNELS_FETCH_FAIL';

export const CHANNELS_INFO_REQUESTED = 'CHANNELS_INFO_REQUESTED';
export const CHANNELS_INFO_FETCH_SUCCESS = 'CHANNELS_INFO_FETCH_SUCCESS';

export function asyncFetchChannels(params) {
  if (params.uuid) {
    return feedcast.getChannelInfo(params)
  }

  return feedcast.getChannels(params);
}

export function requestChannels({ page, perPage }) {
  return {
    type: CHANNELS_REQUESTED,
    payload: { page, per_page: perPage }
  };
}

export function requestChannelInfo(channelID, page=1) {
  return {
    type: CHANNELS_INFO_REQUESTED,
    payload: { uuid: channelID, page }
  };
}

export function requestChannelInfoSuccess(data) {
  return {
    type: CHANNELS_INFO_FETCH_SUCCESS,
    payload: data,
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
