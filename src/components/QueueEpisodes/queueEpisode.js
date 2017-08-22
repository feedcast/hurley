import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import helpers from 'app/scripts/helpers'

import { playEpisode } from 'app/actions/player';

export default class QueueEpisode extends Component {

  playEpisode(){
    this.props.dispatch(
      playEpisode(this.props.episode, this.props.episodes)
    );
  }

  render(){
    const {
      title,
      audio,
      slug,
      channel : c
    } = this.props.episode


    return (
      <div className="feedcast__queueEpisode">
        <div className="feedcast__queueEpisode-button-wrapper">
          <button
            onClick={() => this.playEpisode()}
            className="feedcast__queueEpisode-play-button">
            <i className="fa fa-play"></i>
          </button>
        </div>
        <div className="feedcast__queueEpisode-info-wrapper">
          <Link to={`/${c.slug}/${slug}`}><h4>{title}</h4></Link>
          <button>
            <i className="fa fa-ellipsis-h"></i>
          </button>
          <span>{helpers.secondsToHms(audio.duration)}</span>
        </div>
      </div>
    )
  }
}
