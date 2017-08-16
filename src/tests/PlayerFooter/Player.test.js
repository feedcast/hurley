import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import feedcastApi from 'feedcast-client';
import Player from 'app/components/PlayerFooter/Player';

const VALID_AUDIO_URL = './../fixtures/valid_audio.mp3'
const VALID_EPISODE = {
  uuid: '12345',
  title: 'test title',
  audio: {
    url: VALID_AUDIO_URL
  }
}

describe('Player', () => {
  describe('when has no episode', () => {
    const state = {
      episode: {},
      episodes: [],
    };

    const component = shallow(<Player {...state}/>)

    it('doesnt render', () => {
      expect(component.find('.feedcast__playerFooter')).toHaveLength(0);
    });
  });

  describe('when has valid episode', () => {
    const state = {
      episode: VALID_EPISODE,
      episodes: [],
    };

    const component = shallow(<Player {...state} />)

    it('should contains a backward button', () => {
      expect(component.find('.feedcast__player-backward')).toHaveLength(1);
    });

    it('should contains a forward button', () => {
      expect(component.find('.feedcast__player-forward')).toHaveLength(1);
    });

    it('should contains a playback-rate button', () => {
      expect(component.find('.feedcast__player-playback-rate')).toHaveLength(1);
    });

    it('should contains a play/pause button', () => {
      expect(component.find('.feedcast__player-play-pause')).toHaveLength(1);
    });
  });

  describe('when episode has ended', () => {
    const state = {
      episode: VALID_EPISODE,
      episodes: [],
      events: {
        onEpisodeEnd: jest.fn(),
      },
    };

    const component = mount(<Player {...state} />)

    it('call onEpisodeEnd event', () => {
      component.root.node.audioPlayer.onended();
      expect(state.events.onEpisodeEnd).toBeCalled();
    });
  });
})
