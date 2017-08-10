import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { requestAllEpisodes, changeEpisodesForPage } from 'app/actions/episodes';
import FeedcastLoader from 'app/components/FeedcastLoader';
import EpisodesList from './EpisodesList';

class EpisodesListContainer extends PureComponent {
  componentDidMount() {
    this.fetchEpisodes(this.props.page);
  }

  fetchEpisodes(page) {
    this.props.dispatch(requestAllEpisodes({
      page: page,
      perPage: this.props.perPage,
    }));
  }

  render() {
    let page = parseInt(this.props.params.page || "1");
    if (page !== this.props.page) {
      this.fetchEpisodes(page);
      return <FeedcastLoader />;
    }

    return <EpisodesList {...this.props} />;
  }
}

const mapStateToProps = ({ episodes }) => {
  return episodes;
}

export { EpisodesList };
export default connect(mapStateToProps)(EpisodesListContainer);
