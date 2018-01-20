import React from 'react';
import renderer from 'react-test-renderer';
import { withStore } from 'app/tests/helpers';

import Home from './Home';

describe('Home', () => {
  let component, props;

  beforeEach(() => {
    const home = <Home {...props} />;
    component = renderer.create(withStore(home));
  });

  describe('when has no categories', () => {
    const props = { categories: [], episodes: [] };

    it("renders the spinner", () => {
      expect(component).toMatchSnapshot();
    })
  });

  describe('when has categories', () => {
    const props = {
      categories: [
        {
          "uuid": "f577cc20-6f24-0135-26f9-6eaa3e61655f",
          "slug": "dragoes-de-garagem",
          "title": "Dragões de Garagem",
          "description": "O Dragões de Garagem é um asdasda",
          "feed_url": "http://dragoesdegaragem.com/feed/podcast/",
          "image_url": "https://img.feedcast.io/http%3A%2F%2Fdragoesdegaragem.com%2Fwp-content%2Fuploads%2Fpowerpress%2Fitunes3000.jpg/300/300",
          "listed": true,
          "synchronization_status": "success",
          "synchronization_status_message": ""
        },
        {
          "uuid": "700bb410-7c81-0135-c1b9-2ad04fbc52e9",
          "slug": "hp-news",
          "title": "HP News ",
          "description": "O HP News Express é um podcast sucinto",
          "feed_url": "https://www.megafono.io/podcast/hp-news/rss.xml",
          "image_url": "https://img.feedcast.io/https%3A%2F%2Fd17choic6g575e.cloudfront.net%2Fchannel%2Fartwork%2Fc10ebc0f-d60c-47ce-ad2e-fca0a4dce570%2Flogo-hpnews-megafone-1400px.png/300/300",
          "listed": true,
          "synchronization_status": "success",
          "synchronization_status_message": ""
        }
      ], episodes: [] };

    it("renders the page", () => {
      expect(component).toMatchSnapshot();
    })
  });
})
