import React, { Component } from 'react';

import EpisodesList from './../components/EpisodesList'

class LastEpisodes extends Component {

  render() {
    const {params} = this.props
    return (
      <EpisodesList params={params}/>
    );
  }

}


export default LastEpisodes;
