import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

class Category extends Component {
  render() {
    return (
      <div>
      <Helmet
          title={`Feedcast`}
          meta={[
            {property: 'og:title',
            content: `Feedcast`},
          ]} />
        <h1> Página da Categoria {this.props.params.page} </h1>
      </div>
    );
  }
}

export default Category;
