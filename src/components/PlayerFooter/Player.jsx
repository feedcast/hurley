import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import helpers from 'app/scripts/helpers'
import 'app/styles/PlayerFooter.sass'

import * as actions from 'app/actions/player'

let lc = helpers.language.words;

class PlayerFooter extends Component {
  static propTypes = {
    episode: PropTypes.object,
    episodes: PropTypes.array.isRequired,
  }

  static defaultProps = {
    episode: {},
    episodes: [],
  }

  constructor(props) {
    super(props);

    this.audioPlayer = document.createElement('AUDIO')
    let { lc } = helpers.localize(this)

    this.state = {
      lc
    }

    this.bindEvents()
  }

  bindEvents(){
    //Player changing state
    this.audioPlayer.onloadeddata = e => this.props.dispatch(actions.onLoadedData());
    this.audioPlayer.oncanplay = e => this.props.dispatch(actions.onCanPlay());
    this.audioPlayer.onpause = e => this.props.dispatch(actions.onPause());
    this.audioPlayer.onended = e => this.props.events.onEpisodeEnd();
    this.audioPlayer.onplay = e => this.props.dispatch(actions.onPlay());

    this.audioPlayer.ontimeupdate = e => {
      if(this.props.loadedData)
        this.props.dispatch(
          actions.onTimeUpdate(this.audioPlayer)
        );
    }

    this.audioPlayer.onabort = e => this.props.dispatch(actions.onAbort());
    this.audioPlayer.onerror = e => this.props.dispatch(actions.onError());
  }



  playEpisode(episode){
    if (!episode.audio) return;

    if (this.audioPlayer.src !== episode.audio.url) {
      this.audioPlayer.src = episode.audio.url;
      this.audioPlayer.play();
    }
  }

  forwardTime(){
    this.audioPlayer.currentTime += 15
  }

  backwardTime(){
    this.audioPlayer.currentTime -= 15
  }

  changeRate(val){
    let {playbackRate : r } = this.props
    let newRate = r >= 2? 1 : r+.5

    if(typeof val !== 'undefined')
      newRate = val

    this.audioPlayer.playbackRate = newRate
    this.props.dispatch(actions.changePlaybackRate(newRate));
  }

  getPerc(){
    let {duration, currentTime} = this.audioPlayer
    return ( currentTime * 100 ) / duration
  }

  handleTimeClick(event){
    if(!this.props.canPlay)
      return false;

    let { clientX : x } = event
    let { left : min , width : total } = event.target.getBoundingClientRect()

    x = x - min

    //Percent where user has clicked
    let percent = parseInt((x * 100) / total)

    let { duration } = this.audioPlayer

    this.audioPlayer.currentTime =  (percent * duration) / 100
  }

  webPlayer(){
    const playingUuid = this.props.episode? this.props.episode.uui: null;
    const { lc } = this.state
    const { episode : e,
            ...props
          } = this.props

    return (
      <div className={`feedcast__footer feedcast__footer--${playingUuid !== null ? 'show':'hide'}`}>
        <div className="feedcast__playerFooter">
          <div className="feedcast__playerFooter-top">
            <h5>
              <Link to={`/${e.channel.slug}`}> {e.channel.title} </Link>
              <i className="fa fa-angle-double-right"></i>
              <Link to={`/${e.channel.slug}/${e.slug}`}> {e.title} </Link>
            </h5>
          </div>
          <div className="feedcast__playerFooter-bottom">
            <button
              className="feedcast__player-backward"
              onClick={e=>{this.backwardTime()}}>
              <i className="fa fa-backward"></i>
            </button>
            <button
              className="feedcast__player-play-pause"
              onClick={e=>{this.audioPlayer[`${this.props.isPaused?'play':'pause'}`]()}}>
              {this.props.loadedData === false ? (
                <i className="fa fa-spinner fa-pulse fa-fw"></i>
              ):(
                <i className={`fa fa-${this.props.isPaused?'play':'pause'}`}></i>
              )}
            </button>
            <button
              className="feedcast__player-forward"
              onClick={e=>{this.forwardTime()}}>
              <i className="fa fa-forward"></i>
            </button>
            <div
              className={`feedcast__player-time ${this.props.isError ? 'feedcast__player-time--error':''}`}
              onClick={ e => { this.handleTimeClick(e)} }>
              <div
                style={{
                  width: `${this.getPerc()}%`
                }}
                className="feedcast__player-time-bar">
              </div>
              <span>
                { this.props.isError ? lc.failLoadMedia :
                `${this.props.currentTime} / ${this.props.duration}`}
              </span>
            </div>
            <button
              className="feedcast__player-playback-rate"
              onClick={ e => this.changeRate() }>
              {parseFloat(this.props.playbackRate).toFixed(1)}x
            </button>
          </div>
        </div>
      </div>
    )
  }

  render(){
    if (!this.props.episode || !this.props.episode.audio) { return null; }

    this.playEpisode(this.props.episode);
    return this.webPlayer()
  }
}

export default PlayerFooter
