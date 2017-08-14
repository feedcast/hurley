import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';
import ChannelCard from 'app/components/ChannelCard'

class Category extends Component {

  static propTypes = {
    category: PropTypes.object.isRequired,
  }

  static defaultProps = {
    category: { channels: [] },
  }

  listChannels(){
    if(!this.props.category.channels) { return null; }

    return this.props.category.channels
            .filter(c => c.listed)
            .map((channel, i) => (<ChannelCard key={i} data={channel}/>));
  }

  render() {
    const channelList = this.listChannels()

    return (
      <div>
        <Helmet
          title={`Feedcast`}
          meta={[
            {property: 'og:title',
            content: `Feedcast ${ this.props.category.title }`},
          ]} />
        <h1>{this.props.title} </h1>
        <div className="feedcast__channel-list feedcast__channel-list--byCategory">
          {channelList}
        </div>
      </div>
    );
  }
}

export default Category;
