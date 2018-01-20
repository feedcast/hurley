import React from 'react';
import { shallow } from 'enzyme';
import { withStore } from 'app/tests/helpers';

import { EpisodeCardList } from 'app/components/EpisodeCard';
import { LatestEpisodes } from './LatestEpisodes';

const tMock = (key) => key;

describe('LatestEpisodes', () => {
  describe('button for load more episodes', () => {
    let props = { episodes: [] };

    it("renders load more when is not fetching", () => {
      props.isFetching = false;

      const wrapper = shallow(
        <LatestEpisodes onLoadMore={() => null} {...props} t={tMock} />
      );

      expect(wrapper.find('button').text()).toBe('common.load_more');
    })

    it("renders loading when is fetching", () => {
      props.isFetching = true;

      const wrapper = shallow(
        <LatestEpisodes onLoadMore={() => null} {...props} t={tMock} />
      );

      expect(wrapper.find('button').text()).toBe('common.loading');
    })
  });
})
