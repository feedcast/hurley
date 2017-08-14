import React, { Component } from 'react'
import { connect } from 'react-redux';

import { playEpisode } from 'app/actions/player';
import helpers from './../scripts/helpers'
import { Link } from 'react-router'
import './../styles/EpisodeCard.sass'


class EpisodeCard extends Component {

  playEpisode(){
    this.props.dispatch(
      playEpisode(this.props.episode, this.props.episodes)
    );
  }

  render(){
    const { episode } = this.props
    const background = `url(${episode.channel.image_url})`
    return (
      <div
        className="feedcast__episode-card-wrapper">
        <div className="feedcast__episode-card"
          style={{ background }}
          onClick={() => this.playEpisode()}>
          <span
            className="feedcast__episode-duration">
            {helpers.secondsToHms(episode.audio.duration)}
          </span>
        </div>
        <h3 onClick={() => this.playEpisode()}> {episode.title} </h3>
        <h5>
          <Link to={`/channel/${episode.channel.uuid}/`}>{episode.channel.title}</Link>
        </h5>
      </div>
    )
  }
}

export default connect()(EpisodeCard);
