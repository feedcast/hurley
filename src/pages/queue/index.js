import React, { Component } from 'react';
import helpers from 'app/scripts/helpers'
import { connect } from  'react-redux';

import QueueEpisodes from 'app/components/QueueEpisodes';

import 'app/styles/queue.sass'

export class NoEpisodes extends Component {

  constructor(props) {
    super(props);
    let { lc } = helpers.localize(this)
    this.state = { lc }
  }


  componentWillUnmount(){
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
  }

  render (){
    const {lc} = this.state
    return (
      <h3>{lc.noEpisodesQueue}</h3>
    )
  }

}


class Queue extends Component {

  render(){

    const {
      playedEpisodes : pe,
      episodes : es,
      episode : e,
    } = this.props

    return (
      <div className="feedcast__section feedcast__queue">
        {(pe.length === 0 && es.length === 0 &&e === null) ?
          (<NoEpisodes/>):(<QueueEpisodes {...this.props} />)
        }
      </div>
    )
  }
}



export default connect(state => state.player)(Queue);
