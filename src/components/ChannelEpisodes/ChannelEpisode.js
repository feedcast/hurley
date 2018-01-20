import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import helpers from 'app/scripts/helpers'
import { playEpisode, addToQueue } from 'app/actions/player';

class ChannelEpisode extends Component {
  constructor(){
    super();

    this.state = {
      seeMore: false,
    }
  }


  playEpisode(){
    this.props.dispatch(
      playEpisode(this.props.episode, this.props.episodes.filter(i => i.uuid !== this.props.episode.uuid))
    );
  }

  addToQueue(){
    this.props.dispatch(
      addToQueue(this.props.episode)
    );
    document.activeElement.blur();
  }


  downloadEpisode(){
    const { audio } = this.props.episode

    let downloadLink = document.createElement('A')

    downloadLink.download = true
    downloadLink.target = '_blank'
    downloadLink.href = audio.url

    downloadLink.click();
    document.activeElement.blur();
  }


  render(){
    const {
      title,
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
          <button className="feedcast__dropdown-button">
            <i className="fa fa-ellipsis-h"></i>
            <ul>
              <li onClick={ e => { this.addToQueue() } }><i className="fa fa-list-ul"></i> Add to Queue</li>
              <li onClick={ (e) => { this.downloadEpisode() } }>
                <i className="fa fa-download"></i> Download</li>
            </ul>
          </button>
          <span>{helpers.secondsToHms(audio.duration)}</span>
        </div>
      </div>
    )
  }
}

export default connect()(ChannelEpisode)
