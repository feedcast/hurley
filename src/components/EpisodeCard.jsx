import React, { Component } from 'react'
import helpers from './../scripts/helpers'
import feedcastApi from 'feedcast-client';
import { Link } from 'react-router'
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
        className="feedcast__episode-card-wrapper">
        <div className="feedcast__episode-card"
          style={{ background }}
          onClick={() => this.playEpisode(episode)}>
          <span
            className="feedcast__episode-duration">
            {helpers.secondsToHms(episode.audio.duration)}
          </span>
        </div>
        <h3 onClick={() => this.playEpisode(episode)}> {episode.title} </h3>
        <h5>
          <Link to={`/channel/${episode.channel.uuid}/`}>{episode.channel.title}</Link>
        </h5>
      </div>
    )
  }



}
