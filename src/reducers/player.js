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
  let {
    playedEpisodes : p,
    episode : e,
    episodes : eps
  } = state
  switch (action.type) {


    /**
     * Add episode to next episodes array
     */
    case actions.PLAYER_ADD_TO_QUEUE:
      eps.push(action.payload.episode)
      return {
        ...state,
        episodes: eps
      }



    /**
     * Play an episode from played episodes
     */
    case actions.PLAYER_PLAY_EPISODE_FROM_PLAYED_EPISODES:
      if(e !== null) p.push(e);
      return {
        ...state,
        playedEpisodes: p.filter(i => i.uuid !== action.payload.episode.uuid),
        episode: action.payload.episode
      }


    /**
     * Play an episode from next episodes
     */
    case actions.PLAYER_PLAY_EPISODE_FROM_NEXT_EPISODES:
      if(e !== null) p.push(e);

      let uuidIndex = null, episodesTemp = [];

      for(var i in eps){
        if(eps[i].uuid !== action.payload.episode.uuid
          && uuidIndex === null){
          p.push(eps[i])
        }
        if(eps[i].uuid === action.payload.episode.uuid){
          uuidIndex = i
        }
        if(i !== uuidIndex && uuidIndex !== null){
          episodesTemp.push(eps[i])
        }
      }

      return {
        ...state,
        playedEpisodes: p,
        episode: action.payload.episode,
        episodes: episodesTemp,
      }


    /**
     * Play an episode and add episodes to the queue
     */
    case actions.PLAYER_PLAY_EPISODE:
      const { episode, episodes } = action.payload;

      if(eps.length === 0)
        eps = episodes;

      if(e !== null &&
        episode.uuid !== e.uuid)
        p.push(e);

      let filt = (list, e) => list.filter(i => i.uuid !== e.uuid)

      return {
        ...state,
        playedEpisodes: filt(p, episode),
        episodes: filt(eps, episode),
        episode,
      };


    /**
     * Play next episode from episodes list
     */
    case actions.PLAYER_PLAY_EPISODE_NEXT:
      const next = action.payload.episodes.shift();
      if(e !== null) p.push(e);

      return {
        ...state,
        playedEpisodes: p,
        episodes: action.payload.episodes,
        episode: next,
      };


    /**
     * Player events
     */
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
