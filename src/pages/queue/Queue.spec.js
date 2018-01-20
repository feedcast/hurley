import React from 'react';
import { mount } from 'enzyme';
import { withContext } from 'app/tests/helpers';

import Queue from './Queue';

describe('Queue', () => {
  const episode = {
    slug: "foo",
    audio: {
      duration: 0,
    },
    channel: {
      slug: "bla",
    }
  }

  describe('when has no episodes', () => {
    const props = { };

    it('shows empty queue', () => {
      const component = mount(<Queue {...props} />);
      expect(component.find('EmptyQueue')).toHaveLength(1);
    });
  });

  describe('when has episodes', () => {
    const props = {
      playedEpisodes: [ episode ],
      episodes: [ episode ],
      episode: episode
    };

    it('doesnt shows empty queue', () => {
      const component = mount(withContext(<Queue {...props} />));
      expect(component.find('EmptyQueue')).toHaveLength(0);
    });

    it('shows QueueEpisodes', () => {
      const component = mount(withContext(<Queue {...props} />));
      expect(component.find('QueueEpisodes')).toHaveLength(1);
    });
  });
});
