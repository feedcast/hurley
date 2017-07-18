import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

class Featured extends Component {
  render() {
    return (
      <div>
      <Helmet
          title={`Feedcast`}
          meta={[
            {property: 'og:title',
            content: `Feedcast`},
          ]} />
        <h1> Tela inicial featured </h1>
      </div>
    );
  }
}

export default Featured;
