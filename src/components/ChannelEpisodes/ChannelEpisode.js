import React, { Component } from 'react'
import { connect } from 'react-redux';

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
      playEpisode(this.props.episode, this.props.episodes)
    );
  }

  render(){
    const { lc } = this.state
    const { title, summary, audio, description } = this.props.episode
    const descText = summary && summary.length > 0 ? summary : description;

    const summaryEl = descText && descText.length > 0 ? (
      <p className={`feedcast__channelEpisode-summary
        feedcast__channelEpisode-summary--${ this.state.seeMore
          ? 'see-more': 'see-less'}`} >
        {descText}
      </p>
    ):'';

    const btnSeeMore = descText && descText.length > 0 ? (
      <button
        className="feedcast__channelEpisode-btn-see-more"
        onClick={()=> this.setState(
          { seeMore: !this.state.seeMore})}>
        {this.state.seeMore ? lc.seeLess : lc.seeMore}
      </button>
    ) : '';

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
          <h4>{title}</h4>
          {summaryEl}
          {btnSeeMore}
          <span>{helpers.secondsToHms(audio.duration)}</span>
        </div>
      </div>
    )
  }
}


export default connect()(ChannelEpisode)
