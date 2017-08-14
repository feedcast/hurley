import * as actions from 'app/actions/episodes';

const initialState = {
  episodes: [],
  page: 0,
  total: 0,
  isFetching: false,
  isMore: false,
}

export default function episodes(state=initialState, action) {
  switch (action.type) {
    case actions.EPISODES_FETCH_ALL:
      return {
        ...state,
        isFetching: true,
        page: action.payload.page,
      };

    case actions.EPISODES_FETCH_MORE:
      return {
        ...state,
        isFetching: true,
        isMore: true,
        page: action.payload.page,
      };

    case actions.EPISODES_FETCH_FOR_CHANNEL:
      return {
        ...state,
        isFetching: true,
        page: action.payload.page,
      };

    case actions.EPISODES_FETCH_SUCCESS:
      let { payload } = action;

      const episodeState = state.isMore ?
        [].concat(state.episodes, payload.episodes) : payload.episodes;

      return {
        ...state,
        isFetching: false,
        isMore: false,
        episodes: episodeState,
        total: parseInt(payload.total || episodeState.length),
      };

    case actions.EPISODES_FOR_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
}
