import React from 'react';
import PropTypes from 'prop-types';

import { EpisodeCardList } from 'app/components/EpisodeCard';
import 'app/styles/EpisodesList.sass'

export function LatestEpisodes({ episodes, onLoadMore, isFetching, t }) {
  const loadMoreBtn = (
    <button onClick={() => onLoadMore()}>
      { isFetching ? t('common.loading') : t('common.load_more') }
    </button>
  );

  return (
    <div className="feedcast__last-episodes">
      <h3>{ t('common.recents') }</h3>
      <div className="feedcast__episodes-list">
        <EpisodeCardList episodes={ episodes } />
        <div className="feedcast__load-more">
          { loadMoreBtn }
        </div>
      </div>
    </div>
  )
}

LatestEpisodes.defaultProps = {
  episodes: [],
  isFetching: false,
};

LatestEpisodes.propTypes = {
  episodes: PropTypes.array,
  isFetching: PropTypes.bool,
  t: PropTypes.func,
  onLoadMore: PropTypes.func
};

export default LatestEpisodes;
