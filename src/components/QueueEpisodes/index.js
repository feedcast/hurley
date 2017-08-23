import React, { Component } from 'react'
import { connect } from 'react-redux';
import QueueEpisode from './queueEpisode'

export default class QueueEpisodes extends Component {
  render(){

    return (
      <div className="feedcast__queueEpisodes">
        {this.props.playedEpisodes.map( (el, n) => (
            <QueueEpisode
              key={n}
              episode={el}
              active={this.props.episode}
              episodes={this.props.episodes}/>))}
        {this.props.episode !== null ?
          (<QueueEpisode
              episode={this.props.episode}
              active={this.props.episode}
              episodes={this.props.episodes}/>):
          (<div></div>)}
        {this.props.episodes.map( (el, n) => (
            <QueueEpisode
              key={n}
              episode={el}
              active={this.props.episode}
              episodes={this.props.episodes}/>))}
      </div>
    )
  }
}

