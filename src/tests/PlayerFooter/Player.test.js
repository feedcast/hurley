import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import { MemoryRouter } from 'react-router-dom'

import feedcastApi from 'feedcast-client';
import Player from 'app/components/PlayerFooter/Player';

const VALID_AUDIO_URL = './../fixtures/valid_audio.mp3'
const VALID_EPISODE = {
  uuid: "40ab9130-bc3c-0134-892d-1ebc5443e621",
  slug: "scicast-numero-175-buracos-negros",
  title: "Scicast #175: Buracos Negros",
  summary: "Salve Deviantes e Derivadas e bem-vindos a mais um incrível SciCast! Nessa semana falaremos do fenômeno que pode até não ser o mais importante de todos, mas  com certeza é aquele com o nome mais legal! Vamos falar de Buracos Negros!<br />\n<br />\nDesviando de piadas fáceis vamos guiá-lo do surgimento de uma estrela até sua morte! Sente-se e venha conversar sobre um espaço dentro do espaço! Suas forças, o que se sabe sobre eles e, principalmente, por quê não poderemos contar com super-homem quando mais precisarmos...",
  description: "Salve Deviantes e Derivadas e bem-vindos a mais um incrível SciCast! Nessa semana falaremos do fenômeno que pode até não ser o mais importante de todos, mas  com certeza é aquele com o nome mais legal! Vamos falar de Buracos Negros!\n\nDesviando de piadas fáceis vamos guiá-lo do surgimento de uma estrela até sua morte! Sente-se e venha conversar sobre um espaço dentro do espaço! Suas forças, o que se sabe sobre eles e, principalmente, por quê não poderemos contar com super-homem quando mais precisarmos...",
  published_at: "2017-01-13T02:01:04+00:00",
  audio: {
    url: "http://media.blubrry.com/deviante/media.blubrry.com/deviante_scicast/media.…ubrry.com/scicast/scicast.com.br/podcast/mp3/Scicast175_Buracos_Negros.m4a",
    size: 33529001,
    duration: 6051.074,
    codec: "aac",
    bitrate: 40829,
    sample_rate: 44100,
    status: "analysed",
    analysed_at: null,
    error_message: "",
    error_count: 0
  },
  channel: {
    uuid: "eb926e90-bc31-0134-2276-12e99f394593",
    slug: "scicast",
    title: "SciCast",
    description: "Porque a ciência tem que ser divertida.",
    feed_url: "http://feed.scicast.com.br/",
    image_url: "https://img.feedcast.io/http%3A%2F%2Fdeviante.com.br%2Fwp-content%2Fuploads%2F2016%2F03%2Fscicast2_itunes_By_Deviante2.jpg/300/300",
    listed: true,
    synchronization_status: "failure",
    synchronization_status_message: "http://feed.scicast.com.br/ is not a valid xml feed: 404 Not Found"
  }
}

describe('Player', () => {
  describe('when has no episode', () => {
    const state = {
      playedEpisodes: [],
      episode: {},
      episodes: [],
      playbackRate: 1,
    };

    const component = shallow(<Player {...state}/>)

    it('doesnt render', () => {
      expect(component.find('.feedcast__playerFooter')).toHaveLength(0);
    });
  });

  describe('when has valid episode', () => {
    const state = {
      playedEpisodes: [],
      episode: VALID_EPISODE,
      episodes: [],
      playbackRate: 1,
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
      playedEpisodes: [],
      episode: VALID_EPISODE,
      episodes: [],
      events: {
        onEpisodeEnd: jest.fn(),
      },
      playbackRate: 1,
    };

    const component = mount(<MemoryRouter><Player {...state} /></MemoryRouter>)

    it('call onEpisodeEnd event', () => {
      component.find(Player).node.audioPlayer.onended();
      expect(state.events.onEpisodeEnd).toBeCalled();
    });
  });
})
