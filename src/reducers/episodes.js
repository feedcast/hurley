import * as actions from 'app/actions/episodes';

const initialState = {
  episodes: [],
  total: 0,
}

export default function episodes(state=initialState, action) {
  switch (action.type) {
    case actions.EPISODES_FETCH_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
