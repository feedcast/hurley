import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { requestChannels } from 'app/actions/channels';
import FeedcastLoader from 'app/components/FeedcastLoader';
import ChannelList from './ChannelList';

class ChannelListContainer extends Component {
  componentDidMount() {
    this.request(this.props.page);
  }

  request(page) {
    this.props.dispatch(requestChannels({
      page: page,
      perPage: this.props.perPage,
    }));
  }

  render() {
    const page = parseInt(this.props.params.page || "1");
    if (page !== this.props.page) {
      this.request(page);
    }

    if (this.props.isFetching) {
      return <FeedcastLoader />;
    }

    return <ChannelList {...this.props} />;
  }
}

export { ChannelList };

const mapStateToProps = (state) => state.channels;
export default connect(mapStateToProps)(ChannelListContainer);
