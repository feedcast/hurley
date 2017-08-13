import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { requestEpisodesForChannel } from 'app/actions/episodes';
import FeedcastLoader from 'app/components/FeedcastLoader';
import ChannelEpisodes from './ChannelEpisodes';

class ChannelEpisodesContainer extends Component {

  static defaultProps = {
    episode: {},
    episodes: [],
    isFetching: true,
    page: 0,
    per_page: 20,
  }

  render() {
    const page = parseInt(this.props.params.page || "1");
    if (page != this.props.page)
      this.props.dispatch(requestEpisodesForChannel({
        uuid: this.props.channel.uuid,
        page: page,
      })
    );

    if (this.props.isFetching) {
      return <FeedcastLoader />;
    }

    return <ChannelEpisodes {...this.props} />;
  }
}

const mapStateToProps = (state) => state.episodes;

export { ChannelEpisodes };
export default connect(mapStateToProps)(ChannelEpisodesContainer);
