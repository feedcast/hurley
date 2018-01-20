import React, { Component } from 'react';
import { connect } from  'react-redux';

import Queue from './Queue';

class QueueContainer extends Component {
  render(){
    return (<Queue {...this.props} />);
  }
}

export default connect(state => state.player)(Queue);
