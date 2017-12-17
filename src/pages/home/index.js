import Home from './Home';
import React, { Component } from 'react';
import feedcastApi from 'feedcast-client';

import FeedcastLoader from 'app/components/FeedcastLoader'

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories : [],
    }
  }

  componentDidMount() {
    feedcastApi
      .getCategories({per_page: 50})
      .then(data => data.categories)
      .then(categories => this.setState({ categories }))
  }

  render() {
    if (!this.state.categories.length) {
      return <FeedcastLoader />;
    }

    const { page=1, per_page=50 } = this.props.match.params;

    return (
      <Home page={page} per_page={per_page} categories={this.state.categories} />
    );
  }
}

export { Home };
export default HomeContainer;
