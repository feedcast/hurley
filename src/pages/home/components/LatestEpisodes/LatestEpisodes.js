import React, { Component } from 'react';

import { EpisodeCardList } from 'app/components/EpisodeCard';
import 'app/styles/EpisodesList.sass'

export default class LatestEpisodes extends Component {

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

