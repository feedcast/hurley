import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { requestChannelInfo } from 'app/actions/channels';
import FeedcastLoader from 'app/components/FeedcastLoader';
import Channel from './Channel';

class ChannelContainer extends PureComponent {

  static defaultProps = {
    episodes: [],
    isFetching: true,
    page: 0,
    params: {},
  }

  componentDidMount() {
    const { page = '1', uuid=''} = this.props.params;
    if (uuid != this.props.uuid || page != this.props.page) {
      this.fetchData(uuid, page);
    }
  }

  fetchData(uuid, page) {
    this.props.dispatch(requestChannelInfo(uuid, page));
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
