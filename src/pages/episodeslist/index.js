import React from 'react';
import PropTypes from 'prop-types';

import EpisodesList from './EpisodesList';

function EpisodesListContainer(state) {
  return <EpisodesList {...state} />;
}

export default EpisodesListContainer;
