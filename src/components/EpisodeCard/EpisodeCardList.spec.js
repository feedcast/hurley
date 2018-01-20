import React from 'react';
import { shallow } from 'enzyme';
import { withStore } from 'app/tests/helpers';

import EpisodeCard from './EpisodeCard';
import EpisodeCardList from './EpisodeCardList';

describe('EpisodeCardList', () => {
  describe('when has no episodes', () => {
    let props = { episodes: [] };

    it("renders no <EpisodeCard />", () => {
      props.isFetching = false;

      const wrapper = shallow(
        <EpisodeCardList {...props} />
      );

      expect(wrapper.find(EpisodeCard)).toHaveLength(0);
    })
  });

  describe('when has episodes', () => {
    let props = {
      episodes: [
        {
          uuid: "aadwdadadwawdknaw",
          slug: "pensando-rpg-number-081-entenda-a-figura-do-bruxo-warlock",
          title: "Pensando RPG #081 - Entenda a figura do Bruxo (Warlock)",
          summary: "Bla bla bla",
          description: "Bla bla bla",
          published_at: "2017-08-10T21:58:31+00:00",
        },
        {
          uuid: "123123aadwdadadwawdknaw",
          slug: "pensando-rpg-number-081-entenda-a-figura-do-bruxo-warlock",
          title: "Pensando RPG #081 - Entenda a figura do Bruxo (Warlock)",
          summary: "Bla bla bla",
          description: "Bla bla bla",
          published_at: "2017-08-10T21:58:31+00:00",
        }
      ]
    };

    it("renders no the number of <EpisodeCard />", () => {
      props.isFetching = false;

      const wrapper = shallow(
        <EpisodeCardList {...props} />
      );

      expect(wrapper.find(EpisodeCard)).toHaveLength(2);
    })
  });
})
