import React, { Component } from 'react'
import feedcastApi from './../scripts/feedcastApi'


class PlayerFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.bindEvents()
  }



  bindEvents(){
    feedcastApi.on('play:episode', this.playEpisode)
  }



  playEpisode(episode){
    //TODO: play episode, playlists and
    //design the interface to control
    console.log(episode)

  }



  render(){
    return (
      <div>
        <h1>player</h1>
      </div>
    )
  }
}


export default PlayerFooter
