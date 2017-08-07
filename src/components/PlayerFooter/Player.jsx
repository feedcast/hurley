import React, { Component } from 'react'
import { connect } from  'react-redux';

import helpers from 'app/scripts/helpers'
import 'app/styles/PlayerFooter.sass'

let lc = helpers.language.words;

class PlayerFooter extends Component {
  constructor(props) {
    super(props);

    this.audioPlayer = document.createElement('AUDIO')

    this.state = {
      episodes : [],
      playingUuid : null,
      isPaused: this.audioPlayer.paused,
      canPlay: false,
      loadedData: false,
      isError: false,
      duration: '00:00:00',
      currentTime:'00:00:00',
      title:'',
      playbackRate: 1,
      lc
    }

    this.bindEvents()
  }

  onPlay(){
    this.setState({isPaused: false})
  }

  onPause(){
    this.setState({isPaused: true})
  }

  onCanPlay(){
    this.setState({canPlay: true, isError: false})
  }

  onLoadedData(){
    this.setState({loadedData: true, isError: false})
  }

  onTimeUpdate(){
    if(this.state.loadedData){
      this.setState({
        duration: helpers.secondsToHms(this.audioPlayer.duration),
        currentTime: helpers.secondsToHms(this.audioPlayer.currentTime)
      });
    }
  }


  _onAbort(){
    const abt = {
      canPlay: false,
      isPaused: true,
      isError: false,
      loadedData: false
    }
    this.setState(abt)
  }



  _onError(){
    const err = {
      canPlay: false,
      isPaused: false,
      isError: true,
      loadedData: true
    }
    this.setState(err)
  }



  bindEvents(){
    feedcastApi.on('play:episode', this.playEpisode.bind(this))

    //Player changing state
    this.audioPlayer.onplay = e => this.onPlay(e)
    this.audioPlayer.onpause = e => this.onPause(e)
    this.audioPlayer.oncanplay = e => this.onCanPlay(e)
    this.audioPlayer.onloadeddata = e => this.onLoadedData(e)

    this.audioPlayer.ontimeupdate = e => this.onTimeUpdate(e)


    this.audioPlayer.onabort = e => this._onAbort(e)
    this.audioPlayer.onerror = e => this._onError(e)
  }



  playEpisode(episode){
    if (!episode) return;

    let episodes = this.state.episodes;
    episodes[episode.uuid] = episode;

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
    let {playbackRate : r } = this.state
    let newRate = r >= 2? 1 : r+.5

    if(typeof val !== 'undefined')
      newRate = val

    this.audioPlayer.playbackRate = newRate
  }

  getPerc(){
    let {duration, currentTime} = this.audioPlayer
    return ( currentTime * 100 ) / duration
  }


  handleTimeClick(event){
    if(!this.state.canPlay)
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

    const {episodes, episode} = this.props;
    const playingUuid = episode? episode.uui: null;
    const currentEpisode = episodes[playingUuid];

    return (
      <div className={`feedcast__footer feedcast__footer--${playingUuid !== null ? 'show':'hide'}`}>
        <div className="feedcast__playerFooter">
          <div className="feedcast__playerFooter-top">
            <h5>{this.props.title}</h5>
          </div>
          <div className="feedcast__playerFooter-bottom">
            <button
              className="feedcast__player-backward"
              onClick={e=>{this.backwardTime()}}>
              <i className="fa fa-backward"></i>
            </button>
            <button
              className="feedcast__player-play-pause"
              onClick={e=>{this.audioPlayer[`${this.state.isPaused?'play':'pause'}`]()}}>
              {this.state.loadedData === false ? (
                <i className="fa fa-spinner fa-pulse fa-fw"></i>
              ):(
                <i className={`fa fa-${this.state.isPaused?'play':'pause'}`}></i>
              )}
            </button>
            <button
              className="feedcast__player-forward"
              onClick={e=>{this.forwardTime()}}>
              <i className="fa fa-forward"></i>
            </button>
            <div
              className={`feedcast__player-time ${this.state.isError ? 'feedcast__player-time--error':''}`}
              onClick={ e => { this.handleTimeClick(e)} }>
              <div
                style={{
                  width: `${this.getPerc()}%`
                }}
                className="feedcast__player-time-bar">
              </div>
              <span>
                { this.state.isError ? lc.failLoadMedia :
                `${this.state.currentTime} / ${this.state.duration}`}
              </span>
            </div>
            <button
              className="feedcast__player-playback-rate"
              onClick={ e => this.changeRate() }>
              {parseFloat(this.state.playbackRate).toFixed(1)}x
            </button>
          </div>
        </div>
      </div>
    )
  }


  mobilePlayer(){
    const {episodes, playingUuid} = this.state

    return (
      <div className={`feedcast__footer feedcast__footer--${playingUuid !== null ? 'show':'hide'}`}>
        <div className="feedcast__playerFooter">
          <div className="feedcast__playerFooter-top">
            <h5>{this.state.title}</h5>
          </div>
          <div className="feedcast__playerFooter-bottom">
            <audio ref={ (el) => { this.audioPlayer = el } } controls></audio>
          </div>
        </div>
      </div>
    )
  }



  render(){
    this.playEpisode(this.props.episode);
    return this.webPlayer()
  }
}

export default connect(state => state.player)(PlayerFooter)
