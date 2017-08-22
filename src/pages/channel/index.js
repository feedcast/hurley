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
    const { page = '1', slug=''} = this.props.match ? this.props.match.params : this.props
    if (slug != this.props.slug || page != this.match.params.props.page) {
      this.fetchData(slug, page);
    }
  }

  fetchData(slug, page) {
    this.props.dispatch(requestChannelInfo(slug, page));
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
