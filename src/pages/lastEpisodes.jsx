import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

class LastEpisodes extends Component {
  render() {
    return (
      <div>
        <Helmet
          title={`Feedcast`}
          meta={[
            {property: 'og:title',
            content: `Feedcast`},
          ]} />
        <h1> Lista de últimos episódios </h1>
      </div>
    );
  }
}

export default LastEpisodes;
