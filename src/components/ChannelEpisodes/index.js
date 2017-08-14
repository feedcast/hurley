import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { requestEpisodesForChannel } from 'app/actions/episodes';
import FeedcastLoader from 'app/components/FeedcastLoader';
import ChannelEpisodes from './ChannelEpisodes';

class ChannelEpisodesContainer extends Component {

  static propTypes = {
    page: PropTypes.number,
    per_page: PropTypes.number,
    episode: PropTypes.object,
    episodes: PropTypes.array,
    isFetching: PropTypes.bool,
  }

  static defaultProps = {
    episode: {},
    episodes: [],
    isFetching: true,
    page: 0,
    per_page: 20,
  }

  componentDidMount() {
    const { page = '1' } = this.props.params;
    if (page != this.props.page)
      this.props.dispatch(requestEpisodesForChannel({
        uuid: this.props.channel.uuid,
        page: parseInt(page),
      }));
  }

  render() {
    if (this.props.isFetching) {
      return <FeedcastLoader />;
    }

    return <ChannelEpisodes {...this.props} />;
  }
}

const mapStateToProps = (state) => state.episodes;

export { ChannelEpisodes };
export default connect(mapStateToProps)(ChannelEpisodesContainer);
