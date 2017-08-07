import React from 'react';
import PropTypes from 'prop-types';
import { connect } from  'react-redux';

import Player from './Player';

function PlayerContainer({...props}) {
  return <Player {...props} />;
}

export default connect(({player})=> { return {player} })(PlayerContainer);
