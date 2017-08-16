import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  requestAllEpisodes,
  requestMoreEpisodes
} from 'app/actions/episodes';

import { EpisodeCardList } from 'app/components/EpisodeCard';

import 'app/styles/EpisodesList.sass'

export class Episodes extends Component {

  render(){
    const loadMoreBtn = (
      <button onClick={() => this.props.onLoadMore()}>
      { this.props.isFetching ? "Loading" : "Load more" }
      </button>
    );

    return (
      <div className="feedcast__last-episodes">
        <h3> Recents </h3>
        <div className="feedcast__episodes-list">
          <EpisodeCardList episodes={ this.props.episodes } />
          <div className="feedcast__load-more">
            { this.props.episodes.length > 0 ? loadMoreBtn : ''}
          </div>
        </div>
      </div>
    )
  }
}

class EpisodesContainer extends Component {
  componentDidMount() {
    this.props.dispatch(requestAllEpisodes({
      page: this.props.page,
      per_page: 10,
    }));
  }

  fetchMore(page) {
    this.props.dispatch(requestMoreEpisodes({
      page,
      per_page: 10,
    }));
  }

  render() {
    return (
      <Episodes
        {...this.props}
        onLoadMore={ () => this.fetchMore(this.props.page + 1) }
      />
    );
  }
}

const mapStateToProps = (state) => { return state.episodes; };
export default connect(mapStateToProps)(EpisodesContainer);
