import React from 'react';
import { connect } from  'react-redux';

import { playEpisodeNext, requestMoreEpisodes } from 'app/actions/player';

import Player from './Player';

function PlayerContainer(state) {
  const events = {
    onEpisodeEnd: () => {
      if(state.episodes.length === 1){
        state.dispatch(requestMoreEpisodes(state.episodes[0]))
      }
      state.dispatch(playEpisodeNext(state.episodes));
    },
  }

  return <Player {...state} events={ events }/>;
}

export { Player };
export default connect(state => state.player)(PlayerContainer);
