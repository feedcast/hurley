import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Page from './Page';

import feedcastApi from 'feedcast-client';

class PageContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    }
  }

  componentDidMount() {
    feedcastApi
    .getCategories({per_page: 50, page: 1})
    .then( data => {
        this.setState({
          categories : data.categories,
        })
    })
  }

  render() {
    if (!this.state.categories.length)
      return null;

    return <Page categories={this.state.categories} {...this.props} />;
  }
}

export default PageContainer;
