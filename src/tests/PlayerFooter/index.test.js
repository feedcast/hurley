import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import feedcastApi from 'feedcast-client';
import PlayerFooter from './../../components/PlayerFooter.jsx';

const VALID_AUDIO_URL = './../fixtures/valid_audio.mp3'
const VALID_EPISODE = {
  uuid: '12345',
  title: 'test title',
  audio: {
    url: VALID_AUDIO_URL
  }
}

describe('<PlayerFooter/>', () => {

  describe('Test if elements are present on DOM', () => {
    let wrapper;

    beforeEach(()=>{
      wrapper = shallow(<PlayerFooter/>)
    })

    it('should contains a backward button', () => {
      expect(wrapper.find('.feedcast__player-backward').length).toBe(1);
    })


    it('should contains a forward button', () => {
      expect(wrapper.find('.feedcast__player-forward').length).toBe(1);
    })


    it('should contains a playback-rate button', () => {
      expect(wrapper.find('.feedcast__player-playback-rate').length).toBe(1);
    })


    it('should contains a play/pause button', () => {
      expect(wrapper.find('.feedcast__player-play-pause').length).toBe(1);
    })

  })


  describe('Test Methods and events', () => {

    it('should call playEpisode method after dispatching event of play episode', done => {
      PlayerFooter.prototype.playEpisode = e => done()
      const wrapper = mount(<PlayerFooter />);
      feedcastApi.emit('play:episode', VALID_EPISODE)
    })


    it('should receive the valid episode object', done => {
      PlayerFooter.prototype.playEpisode = e => {
        expect(e).toEqual(VALID_EPISODE);
        done();
      }
      const wrapper = mount(<PlayerFooter />);
      feedcastApi.emit('play:episode', VALID_EPISODE)
    })


  })



})
