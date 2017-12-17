import React from 'react';
import PropTypes from 'prop-types';

import { EpisodeCardList } from 'app/components/EpisodeCard';
import 'app/styles/EpisodesList.sass'

function LatestEpisodes({ episodes, onLoadMore, isFetching }) {
  const loadMoreBtn = (
    <button onClick={() => onLoadMore()}>
    { isFetching ? "Loading" : "Load more" }
    </button>
  );

  return (
    <div className="feedcast__last-episodes">
      <h3> Recents </h3>
      <div className="feedcast__episodes-list">
        <EpisodeCardList episodes={ episodes } />
        <div className="feedcast__load-more">
          { episodes.length > 0 ? loadMoreBtn : ''}
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
  onLoadMore: PropTypes.func
};

export default LatestEpisodes;
