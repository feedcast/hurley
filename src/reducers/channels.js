import * as actions from 'app/actions/channels';

const initialState = {
  channels: [],
  page: 1,
  per_page: 30,
  total: 0,
  isFetching: false,
}

export default function channels(state=initialState, action) {
  switch (action.type) {
    case actions.CHANNELS_REQUESTED:
      return {
        ...state,
        isFetching: true,
        page: action.payload.page,
      };

    case actions.CHANNELS_FETCH_SUCCESS:
      let { channels, total } = action.payload;
      return {
        ...state,
        isFetching: false,
        channels: channels,
        total: parseInt(total || channels.length),
      };

    default:
      return state;
  }
}
