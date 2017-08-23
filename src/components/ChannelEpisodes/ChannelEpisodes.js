import React, { Component } from 'react'
import PropTypes from 'prop-types';

import ChannelEpisode from './ChannelEpisode'
import Pagination from 'app/components/Pagination'

class ChannelEpisodes extends Component {
  static propTypes = {
    episodes: PropTypes.array.isRequired,
    channel: PropTypes.object.isRequired,
  }

  static defaultProps = {
    episodes: [],
    channel: {},
  }

  listEpisodes(){
    if (this.props.episodes.length === 0) {
      return null
    }

    return this.props.episodes.map(
      (episode, idx) =>
        <ChannelEpisode
          key={idx}
          episodes={this.props.episodes}
          episode={episode} />
    )
  }

  render(){
    const list = this.listEpisodes();


    return (
      <div className="feedcast__section">
        <div className="feedcast__channelEpisodes">
          {list}
        </div>
        <Pagination
          url={`/${this.props.channel.slug}/episodes/`}
          page={this.props.page}
          per_page={this.props.per_page}
          total={this.props.total}
          theme="white" />
      </div>
    )
  }
}


export default ChannelEpisodes
