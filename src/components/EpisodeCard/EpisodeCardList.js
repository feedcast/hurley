import React from 'react';
import PropTypes from 'prop-types';

import EpisodeCard from './EpisodeCard';

function EpisodeCardList({ episodes }) {
  if (!episodes.length) {
    return null;
  }

  return (
    <div className="feedcast__episodes-list">
    {
      episodes.map(episode =>
              <EpisodeCard
                 key={episode.uuid}
                 episodes={episodes}
                 episode={episode} />
      )
    }
    </div>
  );
}

EpisodeCardList.defaultProps = {
  episodes: [],
};

EpisodeCardList.propTypes = {
  episodes: PropTypes.array
};

export default EpisodeCardList;
