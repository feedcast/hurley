import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'app/styles/channelList.sass';

import Pagination from 'app/components/Pagination'
import ChannelCard from 'app/components/ChannelCard'


class ChannelList extends Component {
  static propTypes = {
    channels: PropTypes.array.isRequired,
  }

  static defaultProps = {
    channels: [],
  }

  listChannels(){
    return this.props.channels
            .filter(c => c.listed)
            .map((c, n) => (<ChannelCard key={n} data={c}/>));
  }

  render() {
    return (
      <div className="feedcast__channel-list">
        <Helmet
          title={`Feedcast | Channels`}
          meta={[
            {property: 'og:title',
            content: `Feedcast | Channels`},
          ]} />
        { this.listChannels() }
        <Pagination
          url="/channels/"
          page={this.props.page}
          total={this.props.total}
          per_page={this.props.per_page}/>
      </div>
    );
  }
}

export default ChannelList;
