export const PLAYER_PLAY_EPISODE = 'PLAYER_PLAY_EPISODE';
export const PLAYER_PLAY_EPISODE_NEXT = 'PLAYER_PLAY_EPISODE_NEXT';

export function playEpisode(episode, episodes) {
  return {
    type: PLAYER_PLAY_EPISODE,
    payload: { episode, episodes },
  }
}

export function playEpisodeNext(episodes) {
  return {
    type: PLAYER_PLAY_EPISODE_NEXT,
    payload: { episodes },
  }
}
