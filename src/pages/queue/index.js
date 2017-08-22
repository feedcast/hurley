import React, { Component } from 'react';
import { connect } from  'react-redux';
import QueueEpisodes from 'app/components/QueueEpisodes';

import 'app/styles/queue.sass'

class Queue extends Component {
  render(){
    return (
      <div className="feedcast__section feedcast__queue">
        <QueueEpisodes episode={this.props.episode} episodes={this.props.episodes}/>
      </div>
    )
  }
}



export default connect(state => state.player)(Queue);
