import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  requestAllEpisodes,
  requestMoreEpisodes
} from 'app/actions/episodes';

import LatestEpisodes from './LatestEpisodes';

class EpisodesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page
    }
  }

  componentWillMount() {
    this.props.dispatch(requestAllEpisodes({
      page: 1,
      per_page: this.props.per_page,
    }));
  }

  componentDidMount() {
    this.props.dispatch(requestAllEpisodes({
      page: this.props.page,
      per_page: this.props.per_page,
    }));
  }

  fetchMore(page) {
    this.setState({ page }, () => {
      this.props.dispatch(requestMoreEpisodes({
        page,
        per_page: 12,
      }));
    })
  }

  componentWillReceiveProps(props) {
    if (props.page == this.props.page)
      return;

    this.props.dispatch(requestAllEpisodes({
      page: this.props.page,
      per_page: this.props.per_page,
    }));
  }

  render() {
    const { page } = this.state
    return (
      <LatestEpisodes
        {...this.props}
        onLoadMore={ () => this.fetchMore(parseInt(page) + 1) }
      />
    );
  }
}

export { LatestEpisodes };
const mapStateToProps = (state) => { return state.episodes; };
export default connect(mapStateToProps)(EpisodesContainer);
