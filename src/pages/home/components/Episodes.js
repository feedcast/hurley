import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  requestAllEpisodes,
  requestMoreEpisodes
} from 'app/actions/episodes';

import helpers from 'app/scripts/helpers'
import Helmet from 'react-helmet';
import EpisodeCard from 'app/components/EpisodeCard';

import 'app/styles/EpisodesList.sass'

export class Episodes extends Component {

  cards(){
    const { episodes } = this.props;
    return episodes.length > 0 ?
            episodes.map((e, i) => <EpisodeCard key={i} episode={e}/>):''
  }

  render(){
    const { lc } = this.props
    const episodes = this.cards();
    const loadMoreBtn = (
      <button onClick={() => this.props.onLoadMore()}>
      { this.props.isFetching ? "Loading" : "Load more" }
      </button>
    );

    return (
      <div className="feedcast__last-episodes">
        <h3> Recents </h3>
        <div className="feedcast__episodes-list">
          { episodes }
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
