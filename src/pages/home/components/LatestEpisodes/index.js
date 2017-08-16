import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  requestAllEpisodes,
  requestMoreEpisodes
} from 'app/actions/episodes';

import LatestEpisodes from './LatestEpisodes';

class EpisodesContainer extends Component {
  componentDidMount() {
    this.props.dispatch(requestAllEpisodes({
      page: this.props.page,
      per_page: this.props.per_page,
    }));
  }

  fetchMore(page) {
    this.props.dispatch(requestMoreEpisodes({
      page,
      per_page: 10,
    }));
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
    return (
      <LatestEpisodes
        {...this.props}
        onLoadMore={ () => this.fetchMore(this.props.page + 1) }
      />
    );
  }
}


export { LatestEpisodes };
const mapStateToProps = (state) => { return state.episodes; };
export default connect(mapStateToProps)(EpisodesContainer);
