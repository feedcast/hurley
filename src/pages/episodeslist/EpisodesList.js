import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

import helpers from 'app/scripts/helpers';
import Helmet from 'react-helmet';

import Pagination from 'app/components/Pagination';
import { EpisodeCardList } from 'app/components/EpisodeCard';

import 'app/styles/EpisodesList.sass';

let lc = helpers.language.words;

export default class EpisodesList extends PureComponent {

  static propTypes = {
    page: PropTypes.number.isRequired,
    per_page: PropTypes.number.isRequired,
    total: PropTypes.number,
    episodes: PropTypes.array,
  }

  static defaultProps = {
    page: 1,
    per_page: 20,
    total: 0,
    episodes: [],
  }

  render(){
    let { page } = this.props.match ? this.props.match.params : this.props
    page = parseInt(page)

    return (
      <div className="feedcast__last-episodes feedcast__section">
        <Helmet
          title={`Feedcast | Últimos Episódios`}
          meta={[
            {property: 'og:title',
            content: `Feedcast | Últimos Episódios`},
          ]} />
        <h4> Recent Episodes </h4>
        <div className="feedcast__episodes-block">
          <EpisodeCardList episodes={ this.props.episodes } />
          <Pagination
            url={`/lastEpisodes/`}
            page={page}
            per_page={this.props.per_page}
            total={this.props.total}
            theme="white" />
        </div>
      </div>
    )
  }
}
