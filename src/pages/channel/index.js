import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { requestChannelInfo } from 'app/actions/channels';
import FeedcastLoader from 'app/components/FeedcastLoader';
import Channel from './Channel';

class ChannelContainer extends PureComponent {

  static defaultProps = {
    episodes: [],
    isFetching: true,
    page: 1,
    params: {},
  }

  componentDidMount() {
    const uuid = this.props.params.uuid;
    if (uuid !== this.props.uuid) {
      this.fetchData(uuid, this.props.page);
    }
  }

  fetchData(uuid, page) {
    this.props.dispatch(requestChannelInfo(uuid, page));
  }

  render() {
    const page = parseInt(this.props.params.page || '1');
    if (page !== this.props.page) {
      this.fetchData(
        this.props.params.uuid,
        page,
      );
    }

    if (this.props.isFetching) {
      return <FeedcastLoader />;
    }

    return <Channel {...this.props} channel={this.props.channels[0]} />;
  }
}

const mapStateToProps = (state) => state.channels;

export { Channel };
export default connect(mapStateToProps)(ChannelContainer);
