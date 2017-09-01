import helpers from 'app/scripts/helpers'
import feedcastApi from 'feedcast-client';

export const PLAYER_ADD_TO_QUEUE = 'PLAYER_ADD_TO_QUEUE';
export const PLAYER_CHANGE_PLAYBACK_RATE = 'PLAYER_CHANGE_PLAYBACK_RATE';
export const PLAYER_ON_PLAY = 'PLAYER_ON_PLAY';
export const PLAYER_ON_PAUSE = 'PLAYER_ON_PAUSE';
export const PLAYER_ON_ABORT = 'PLAYER_ON_ABORT';
export const PLAYER_ON_ERROR = 'PLAYER_ON_ERROR';
export const PLAYER_ON_CAN_PLAY = 'PLAYER_ON_CAN_PLAY';
export const PLAYER_ON_LOADED_DATA = 'PLAYER_ON_LOADED_DATA';
export const PLAYER_ON_TIME_UPDATE = 'PLAYER_ON_TIME_UPDATE';
export const PLAYER_PLAY_EPISODE = 'PLAYER_PLAY_EPISODE';
export const PLAYER_PLAY_EPISODE_NEXT = 'PLAYER_PLAY_EPISODE_NEXT';
export const PLAYER_PLAY_EPISODE_FROM_NEXT_EPISODES = 'PLAYER_PLAY_EPISODE_FROM_NEXT_EPISODES';
export const PLAYER_PLAY_EPISODE_FROM_PLAYED_EPISODES = 'PLAYER_PLAY_EPISODE_FROM_PLAYED_EPISODES';
export const PLAYER_REQUEST_MORE_EPISODES = 'PLAYER_REQUEST_MORE_EPISODES';
export const PLAYER_EPISODES_FETCH_SUCCESS = 'PLAYER_EPISODES_FETCH_SUCCESS';
export const PLAYER_EPISODES_FETCH_FAIL = 'PLAYER_EPISODES_FETCH_FAIL';

export function requestEpisodesSuccess(data) {
  return {
    type: PLAYER_EPISODES_FETCH_SUCCESS, payload: data
  }
}

export function requestEpisodesFail(error) {
  return {
    type: PLAYER_EPISODES_FETCH_FAIL, payload: { error }
  }
}

export function requestMoreEpisodes(episode) {
    return {
      type: PLAYER_REQUEST_MORE_EPISODES,
      payload: { episode },
    }
}

export function addToQueue(episode) {
  return {
    type: PLAYER_ADD_TO_QUEUE,
    payload: { episode },
  }
}

export function playEpisode(episode, episodes) {
  return {
    type: PLAYER_PLAY_EPISODE,
    payload: { episode, episodes },
  }
}

export function playQueueEpisode(episode, action) {
  return {
    type: action,
    payload: { episode },
  }
}

export function playEpisodeNext(episodes) {
  return {
    type: PLAYER_PLAY_EPISODE_NEXT,
    payload: { episodes },
  }
}

export function onPlay(){
  return {
    type: PLAYER_ON_PLAY,
    payload: {
      isPaused: false
    }
  }
}

export function onPause(){
  return {
    type: PLAYER_ON_PAUSE,
    payload: {
      isPaused: true
    }
  }
}

export function onCanPlay(){
  return {
    type: PLAYER_ON_CAN_PLAY,
    payload: {
      canPlay: true,
      isError: false
    }
  }
}

export function onLoadedData(){
  return {
    type: PLAYER_ON_LOADED_DATA,
    payload: {
      loadedData: true,
      isError: false
    }
  }
}

export function onTimeUpdate(playerEl){
  const currentTime = helpers.secondsToHms(playerEl.currentTime);
  const duration = helpers.secondsToHms(playerEl.duration);
  return {
    type: PLAYER_ON_TIME_UPDATE,
    payload: {
      duration,
      currentTime
    }
  }
}


export function onAbort(){
  return {
    type: PLAYER_ON_ABORT,
    payload: {
      canPlay: false,
      isPaused: true,
      isError: false,
      loadedData: false
    }
  }
}



export function onError(){
  return {
    type: PLAYER_ON_ERROR,
    payload: {
      canPlay: false,
      isPaused: false,
      isError: true,
      loadedData: true
    }
  }
}


export function changePlaybackRate(newRate){
  return {
    type: PLAYER_CHANGE_PLAYBACK_RATE,
    payload: {
      playbackRate: newRate
    }
  }
}
