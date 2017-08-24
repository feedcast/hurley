import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import helpers from 'app/scripts/helpers'
import { playEpisode } from 'app/actions/player';

class ChannelEpisode extends Component {
  constructor(){
    super();

    let { lc } = helpers.localize(this)

    this.state = {
      seeMore: false,
      lc
    }
  }

  playEpisode(){
    this.props.dispatch(
      playEpisode(this.props.episode, this.props.episodes.filter(i => i.uuid !== this.props.episode.uuid))
    );
  }

  render(){
    const { title,
            audio,
            slug,
            channel : c
          } = this.props.episode


    return (
      <div className="feedcast__channelEpisode">
        <div className="feedcast__channelEpisode-button-wrapper">
          <button
            onClick={() => this.playEpisode()}
            className="feedcast__channelEpisode-play-button">
            <i className="fa fa-play"></i>
          </button>
        </div>
        <div className="feedcast__channelEpisode-info-wrapper">
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

export default connect()(ChannelEpisode)
