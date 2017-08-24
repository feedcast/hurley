import React, { Component } from 'react'
import { connect } from 'react-redux';
import QueueEpisode from './queueEpisode'
import * as actions from 'app/actions/player'

export default class QueueEpisodes extends Component {
  render(){

    return (
      <div className="feedcast__queueEpisodes">
        {this.props.playedEpisodes.map( (el, n) => (
            <QueueEpisode
              key={n}
              episode={el}
              action={actions.PLAYER_PLAY_EPISODE_FROM_PLAYED_EPISODES}
              active={this.props.episode}
              episodes={this.props.episodes}/>))}
        {this.props.episode !== null ?
          (<QueueEpisode
              episode={this.props.episode}
              action={actions.PLAYER_PLAY_EPISODE}
              active={this.props.episode}
              episodes={this.props.episodes}/>):
          (<div></div>)}
        {this.props.episodes.map( (el, n) => (
            <QueueEpisode
              key={n}
              episode={el}
              action={actions.PLAYER_PLAY_EPISODE_FROM_NEXT_EPISODES}
              active={this.props.episode}
              episodes={this.props.episodes}/>))}
      </div>
    )
  }
}

