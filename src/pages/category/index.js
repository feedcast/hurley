import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { requestCategoryInfo } from 'app/actions/categories';
import FeedcastLoader from 'app/components/FeedcastLoader';
import Category from './Category';

class CategoryContainer extends PureComponent {

  static defaultProps = {
    categories: [],
    isFetching: true,
    params: {},
  }

  fetchData(slug) {
    this.props.dispatch(requestCategoryInfo(slug));
  }

  render() {
    if (this.props.isFetching) {
      return <FeedcastLoader />;
    }

    const category = this.props.categories[0] || {};
    if (category.slug !== this.props.match.params.slug) {
      this.fetchData(this.props.match.params.slug);
    }

    return <Category {...this.props} category={this.props.categories[0]} />;
  }
}

const mapStateToProps = (state) => state.categories;

export { Category };
export default connect(mapStateToProps)(CategoryContainer);
