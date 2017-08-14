import player from 'app/reducers/player';
import * as actions from 'app/actions/player';

describe("Player reducer", () => {
  const state = {
    episode: { uuid: 'foo' },
    episodes: [
      { uuid: 'bar' }
    ]
  }

  describe("when playing an episode", () => {
    it('change fill state', () => {
      const newState = {
        type: actions.PLAYER_PLAY_EPISODE,
        payload: {
          episode: { uuid: 'playing' },
          episodes: [{ uuid: 'new' }],
        },
      };

      expect(player(state, newState)).toEqual({
          episode: { uuid: 'playing' },
          episodes: [{ uuid: 'new' }],
      });
    });
  });

  describe("when playing next episode", () => {
    it('change episode', () => {
      const newState = {
        type: actions.PLAYER_PLAY_EPISODE_NEXT,
        payload: {
          episodes: [{ uuid: 'new' }],
        },
      };

      expect(player(state, newState)).toEqual({
          episode: { uuid: 'new' },
          episodes: [],
      });
    });

    it('change doesn`t play next`', () => {
      const newState = {
        type: actions.PLAYER_PLAY_EPISODE_NEXT,
        payload: {
          episodes: [],
        },
      };

      expect(player(state, newState)).toEqual({
          episode: undefined,
          episodes: [],
      });
    });
  });
});
