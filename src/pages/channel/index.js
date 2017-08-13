import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { requestChannelInfo } from 'app/actions/channels';
import FeedcastLoader from 'app/components/FeedcastLoader';
import Channel from './Channel';

class ChannelContainer extends PureComponent {

  static defaultProps = {
    episodes: [],
    isFetching: true,
    params: {},
  }

  componentDidMount() {
    const uuid = this.props.params.uuid;
    if (uuid !== this.props.uuid) {
      this.fetchData(uuid);
    }
  }

  fetchData(channelID) {
    this.props.dispatch(requestChannelInfo(channelID));
  }

  render() {
    if (this.props.isFetching) {
      return <FeedcastLoader />;
    }

    return <Channel {...this.props} channel={this.props.channels[0]} />;
  }
}

const mapStateToProps = (state) => state.channels;

export { Channel };
export default connect(mapStateToProps)(ChannelContainer);
