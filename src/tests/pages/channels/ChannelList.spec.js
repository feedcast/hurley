import React from 'react';
import renderer from 'react-test-renderer';
import { withStore } from 'app/tests/helpers';

import { ChannelList } from 'app/pages/channels';

describe('ChannelList', () => {
  describe('when has no data', () => {
    it("renders the no episode", () => {
      const component = renderer.create(<ChannelList />);
      expect(component).toMatchSnapshot();
    })
  });

  describe('when has a list of channels', () => {
    const state = {
      channels: [
        {
          uuid: "asdasdadasda",
          slug: "pensando-rpg",
          title: "Pensando RPG",
          description: "",
          feed_url: "http://feeds.soundcloud.com/users/soundcloud:users:257525576/sounds.rss",
          image_url: "https://img.feedcast.io/http%3A%2F%2Fi.imgur.com%2FmYRfJk7.png/300/300",
          listed: true,
          synchronization_status: "success",
          synchronization_status_message: ""
        },
        {
          uuid: "asdasdasdakkkkkkkkkkk",
          slug: "pensando-rpg",
          title: "Not listed",
          description: "",
          feed_url: "http://feeds.soundcloud.com/users/soundcloud:users:257525576/sounds.rss",
          image_url: "https://img.feedcast.io/http%3A%2F%2Fi.imgur.com%2FmYRfJk7.png/300/300",
          listed: false,
          synchronization_status: "success",
          synchronization_status_message: ""
        }
      ],
      page: 1,
      perPage: 130,
      total: 1000,
    }

    it('render the channels', () => {
      const component = renderer.create(withStore(<ChannelList {...state} />));
      expect(component).toMatchSnapshot();
    });
  });
})
