import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import feedcastApi from 'feedcast-client';

import helpers from 'app/scripts/helpers';
import Helmet from 'react-helmet';

import Pagination from 'app/components/Pagination';
import EpisodeCard from 'app/components/EpisodeCard';
import FeedcastLoader from 'app/components/FeedcastLoader';

import 'app/styles/EpisodesList.sass';

let lc = helpers.language.words;

export default class EpisodesList extends PureComponent {

  static propTypes = {
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    total: PropTypes.number,
    episodes: PropTypes.array,
  }

  static defaultProps = {
    page: 1,
    perPage: 30,
    total: 0,
    episodes: [],
  }

  constructor(props) {
    super(props);
  }

  renderEpisodeCards(){
    let { episodes } = this.props;
    return episodes.length > 0 ?
            episodes.map(e => <EpisodeCard key={e.uuid} episode={e}/>):
            (<h1>No Episode found</h1>)
  }

  hasEpisodes() {
    return this.props.episodes.length > 0;
  }

  render(){
    return this.hasEpisodes() ? (
      <div className="feedcast__last-episodes feedcast__section">
        <Helmet
          title={`Feedcast | Últimos Episódios`}
          meta={[
            {property: 'og:title',
            content: `Feedcast | Últimos Episódios`},
          ]} />
        <h4> Recent Episodes </h4>
        <div className="feedcast__episodes-list">
          { this.renderEpisodeCards() }
          <Pagination
            url={`/lastEpisodes/`}
            page={this.props.page}
            per_page={this.props.per_page}
            total={this.props.total}
            theme="white" />
        </div>
      </div>
    ) : (
      <FeedcastLoader />
    )
  }
}
