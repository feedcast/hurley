import React, { Component } from 'react'
import feedcastApi from './../scripts/feedcastApi'
import helpers from './../scripts/helpers'
import './../styles/PlayerFooter.sass'


class PlayerFooter extends Component {
  constructor(props) {
    super(props);

    this.audioPlayer = document.createElement('AUDIO')

    console.log(this.audioPlayer)
    console.dir(this.audioPlayer)
    this.state = {
      episodes : [],
      playingUuid : null,
      isPaused: this.audioPlayer.paused,
      canPlay: false,
      loadedData: false
    }


    this.bindEvents()
  }



  bindEvents(){
    feedcastApi.on('play:episode', this.playEpisode.bind(this))

    const t = 'AUDIOPLAYER'

    //Player changing state
    this.audioPlayer.onplay = e => {
        console.log(`${t} - onplay:`, e);
        this.setState({isPaused: false})
    }
    this.audioPlayer.onpause = e => {
        console.log(`${t} - onpause:`, e);
        this.setState({isPaused: true})
    }
    this.audioPlayer.oncanplay = e => {
        console.log(`${t} - oncanplay:`, e);
        this.setState({canPlay: true})
    }
    this.audioPlayer.onloadeddata = e => {
        console.log(`${t} - onloadeddata:`, e);
        this.setState({loadedData: true})
    }

    //ERROR HANDLING
    const err = {
      canPlay: false,
      isPaused: true,
      loadedData: false
    }

    this.audioPlayer.onabort = e => {
        console.log(`${t} - onabort:`, e);
        this.setState(err)
    }
    this.audioPlayer.onerror = e => {
        console.log(`${t} - onerror:`, e);
        this.setState(err)
    }
    // this.audioPlayer.onsuspend = e => {
    //     console.log(`${t} - onsuspend:`, e);
    //     this.setState(err)
    // }
  }



  playEpisode(episode){
    let episodes = this.state.episodes
    episodes[episode.uuid] = episode

    this.setState({ episodes, playingUuid: episode.uuid })


    this.audioPlayer.src = episode.audio.url

    this.audioPlayer.play()
  }



  webPlayer(){

    const {episodes, playingUuid} = this.state
    const currentEpisode = episodes[playingUuid]

    return (
      <div className={`feedcast__footer feedcast__footer--${playingUuid !== null ? 'show':'hide'}`}>
        <div className="feedcast__playerFooter">
          <div className="feedcast__playerFooter-top">
            <h5></h5>
          </div>
          <div className="feedcast__playerFooter-bottom">
            <button
              onClick={e=>{this.audioPlayer[`${this.state.isPaused?'play':'pause'}`]()}}>
              <i className={`fa fa-${this.state.isPaused?'play':'pause'}`}></i>
            </button>
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
