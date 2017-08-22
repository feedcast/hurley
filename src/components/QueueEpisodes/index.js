import React, { Component } from 'react'
import { connect } from 'react-redux';
import QueueEpisode from './queueEpisode'

export default class QueueEpisodes extends Component {
  render(){

    return (
      <div className="feedcast__queueEpisodes">
        <QueueEpisode episode={this.props.episode} episodes={this.props.episodes}/>
        {
          this.props.episodes.map(el => (
            <QueueEpisode
              episode={el}
              episodes={this.props.episodes}/>))
        }
      </div>
    )
  }
}

