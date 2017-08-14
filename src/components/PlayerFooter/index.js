import React from 'react';
import { connect } from  'react-redux';

import { playEpisodeNext } from 'app/actions/player';

import Player from './Player';

function PlayerContainer(state) {
  const events = {
    onEpisodeEnd: () => {
      state.dispatch(playEpisodeNext(state.episodes));
    },
  }

  return <Player {...state} events={ events }/>;
}

export { Player };
export default connect(state => state.player)(PlayerContainer);
