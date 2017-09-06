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
    per_page: 10,
  }

  componentDidMount() {
    this.props.dispatch(requestEpisodesForChannel({
      slug: this.props.channel.slug,
      page: parseInt(this.props.page),
    }));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page === nextProps.page) {
      return
    }

    this.props.dispatch(requestEpisodesForChannel({
      slug: nextProps.channel.slug,
      page: parseInt(nextProps.page),
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
