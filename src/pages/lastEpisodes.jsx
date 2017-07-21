import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import feedcastApi from './../scripts/feedcastApi'

import EpisodesList from './../components/EpisodesList'

class LastEpisodes extends Component {

  render() {
    const {params} = this.props
    return (
      <div>
        <Helmet
          title={`Feedcast | Últimos Episódios`}
          meta={[
            {property: 'og:title',
            content: `Feedcast | Últimos Episódios`},
          ]} />
        <h1> Lista de últimos episódios </h1>
        <EpisodesList params={params}/>
      </div>
    );
  }

}


export default LastEpisodes;
