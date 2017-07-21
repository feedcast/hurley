import React, { Component } from 'react'
import helpers from './../scripts/helpers'
import feedcastApi from './../scripts/feedcastApi'
import './../styles/EpisodeCard.sass'



export default class EspisodeCard extends Component {


  playEpisode(episode){
    //sucks redux
    feedcastApi.emit('play:episode', episode)
  }

  render(){
    const { episode } = this.props
    const background = `url(${episode.channel.image_url})`
    return (
      <div
        className="feedcast__episode-card-wrapper"
        onClick={() => this.playEpisode(episode)}>
        <div className="feedcast__episode-card"
          style={{ background }}>
          <span
            className="feedcast__episode-duration">
            {helpers.secondsToHms(episode.audio.duration)}
          </span>
        </div>
        <p> {episode.title} </p>
      </div>
    )
  }



}
