import * as actions from 'app/actions/player';

const initialState = {
  episode: null,
  episodes: [],
  isPaused: true,
  canPlay: false,
  loadedData: false,
  isError: false,
  duration: '00:00:00',
  currentTime:'00:00:00',
  title:'',
  playbackRate: 1,
}

export default function player(state=initialState, action) {
  switch (action.type) {
    case actions.PLAYER_PLAY_EPISODE:
      const { episode, episodes } = action.payload;
      return {
        ...state,
        episodes,
        episode,
      };

    case actions.PLAYER_PLAY_EPISODE_NEXT:
      const next = action.payload.episodes.shift();
      return {
        ...state,
        episodes: action.payload.episodes,
        episode: next,
      };

    default:
      return state;
  }
}
