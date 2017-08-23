import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import helpers from 'app/scripts/helpers'

import * as actions from 'app/actions/player'

class QueueEpisode extends Component {

  playEpisode(){
    const {action} = this.props

    switch(action){
      case actions.PLAYER_PLAY_EPISODE_FROM_PLAYED_EPISODES:
      case actions.PLAYER_PLAY_EPISODE_FROM_NEXT_EPISODES:
        this.props.dispatch(
          actions.playQueueEpisode(this.props.episode, action)
        );
      break;
      case actions.PLAYER_PLAY_EPISODE:
        this.props.dispatch(
          actions.playEpisode(this.props.episode, this.props.episodes)
        );
      break;
    }
  }

  render(){
    const {
      uuid,
      title,
      audio,
      slug,
      channel : c
    } = this.props.episode

    const isActive = uuid === this.props.active.uuid

    return (
      <div className={`feedcast__queueEpisode feedcast__queueEpisode--${isActive? 'playing':'not-playing'}`}>
        <div className="feedcast__queueEpisode-button-wrapper">
          { isActive ? (
            <i className="fa fa-headphones feedcast__playing-status"></i>
          ):(
            <button
              onClick={() => this.playEpisode()}
              className="feedcast__queueEpisode-play-button">
              <i className="fa fa-play"></i>
            </button>
          )}
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

export default connect()(QueueEpisode);
