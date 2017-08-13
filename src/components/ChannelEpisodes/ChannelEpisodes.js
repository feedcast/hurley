import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import feedcastApi from 'feedcast-client';

import helpers from 'app/scripts/helpers'
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
    let list = this.props.episodes.map( (i, n) =>
      <ChannelEpisode key={n} episode={i}/> )
    return this.props.episodes.length > 0 ? list : '';
  }


  render(){
    const list = this.listEpisodes();


    return (
      <div className="feedcast__channelEpisodes">
        <h1>Episodes</h1>
        {list}
        <Pagination
          url={`/channel/${this.props.channel.uuid}/`}
          page={this.props.page}
          per_page={this.props.per_page}
          total={this.props.total}
          theme="white" />
      </div>
    )
  }
}


export default ChannelEpisodes
