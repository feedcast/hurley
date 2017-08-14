import React from 'react';
import { connect } from  'react-redux';

import Player from './Player';

function PlayerContainer(state) {
  return <Player {...state} />;
}

export { Player };

export default connect(state => state.player)(PlayerContainer);
