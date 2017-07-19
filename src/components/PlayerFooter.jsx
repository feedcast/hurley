import React, { Component } from 'react'
import feedcastApi from './../scripts/feedcastApi'
import helpers from './../scripts/helpers'
import './../styles/PlayerFooter.sass'


class PlayerFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes : [],
      playingUuid : null
    }

    this.bindEvents()
  }



  bindEvents(){
    feedcastApi.on('play:episode', this.playEpisode.bind(this))
  }



  playEpisode(episode){
    let episodes = this.state.episodes
    episodes.push(episode);

    this.setState({ episodes })
  }



  webPlayer(){

    let srcAudio = false,
        titleEpisode = ' ',
      { episodes } = this.state;

    if(episodes.length > 0){
      const lastEpisode = episodes[episodes.length - 1]
      srcAudio = lastEpisode.audio.url
      titleEpisode = lastEpisode.title
    }

    return (
      <div className={`feedcast__footer feedcast__footer--${episodes.length > 0 ? 'show':'hide'}`}>
        <div className="feedcast__playerFooter">
          <div className="feedcast__playerFooter-top">
            <h5>{titleEpisode}</h5>
          </div>
          <div className="feedcast__playerFooter-bottom">
            <audio
              autoPlay={!helpers.mobilecheck()}
              controls src={srcAudio}>
            </audio>
          </div>
        </div>
      </div>
    )
  }



  render(){
    return this.webPlayer()
  }
}


export default PlayerFooter
