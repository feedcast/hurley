import * as actions from 'app/actions/episodes';

const initialState = {
  episodes: [],
  page: 1,
  per_page: 30,
  total: 0,
  isFetching: false,
}

export default function episodes(state=initialState, action) {
  switch (action.type) {
    case actions.EPISODES_FETCH_ALL:
      return {
        ...state,
        isFetching: true,
        page: action.payload.page,
      };

    case actions.EPISODES_FETCH_SUCCESS:
      let { episodes, total } = action.payload;
      return {
        ...state,
        isFetching: false,
        episodes: episodes,
        total: parseInt(total || episodes.length),
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
