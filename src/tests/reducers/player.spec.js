import player from 'app/reducers/player';
import * as actions from 'app/actions/player';

describe("Player reducer", () => {

  describe("when playing an episode", () => {
    let state = {}

    beforeEach(() => {
      state = {
        playedEpisodes: [],
        episode: { uuid: 'foo' },
        episodes: [
          { uuid: 'bar' }
        ]
      }
    })

    it('change fill state', () => {
      const newState = {
        type: actions.PLAYER_PLAY_EPISODE,
        payload: {
          episode: { uuid: 'playing' },
          episodes: [{ uuid: 'new' }],
        },
      };

      expect(player(state, newState)).toEqual({
          playedEpisodes: [],
          episode: { uuid: 'playing' },
          episodes: [{ uuid: 'new' }],
      });
    });
  });

  describe("when playing next episode", () => {
    let state = {}

    beforeEach(() => {
      state = {
        playedEpisodes: [],
        episode: { uuid: 'foo' },
        episodes: [
          { uuid: 'bar' }
        ]
      }
    })


    it('change episode', () => {
      const newState = {
        type: actions.PLAYER_PLAY_EPISODE_NEXT,
        payload: {
          episodes: [{ uuid: 'new' }],
        },
      };

      expect(player(state, newState)).toEqual({
          playedEpisodes: [{ uuid: 'foo' }],
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
          playedEpisodes: [{ uuid: 'foo' }],
          episode: undefined,
          episodes: [],
      });
    });
  });
});
