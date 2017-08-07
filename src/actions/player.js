export const PLAYER_PLAY_EPISODE = 'PLAYER_PLAY_EPISODE';

export function playEpisode(episode) {
  return {
    type: PLAYER_PLAY_EPISODE,
    payload: { episode },
  }
}
