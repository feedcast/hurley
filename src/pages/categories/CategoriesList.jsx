import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

class CategoriesList extends Component {
  render() {
    return (
      <div>
      <Helmet
          title={`Feedcast`}
          meta={[
            {property: 'og:title',
            content: `Feedcast`},
          ]} />
        <h1> Lista de Categorias </h1>
      </div>
    );
  }
}

export default CategoriesList;
