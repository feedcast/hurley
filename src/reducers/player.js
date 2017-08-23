import * as actions from 'app/actions/player';

const initialState = {
  episode: null,
  episodes: [],
  playedEpisodes: [],
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
      let { playedEpisodes, episode : e } = state
      playedEpisodes.push(e)

      return {
        ...state,
        playedEpisodes,
        episodes: action.payload.episodes,
        episode: next,
      };

    case actions.PLAYER_CHANGE_PLAYBACK_RATE:
    case actions.PLAYER_ON_LOADED_DATA:
    case actions.PLAYER_ON_TIME_UPDATE:
    case actions.PLAYER_ON_CAN_PLAY:
    case actions.PLAYER_ON_PAUSE:
    case actions.PLAYER_ON_ABORT:
    case actions.PLAYER_ON_ERROR:
    case actions.PLAYER_ON_PLAY:
      const { ...options } = action.payload
      return {
        ...state,
        ...options
      }

    default:
      return state;
  }
}
