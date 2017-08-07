import * as actions from 'app/actions/player';

const initialState = {
  episode: null,
  episodes: [],
  playingUuid : null,
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
      const { episode } = action.payload;
      return {
        ...state,
        episode
      };

    default:
      return state;
  }
}
