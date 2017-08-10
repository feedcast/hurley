import React, { Component } from 'react'
import feedcastApi from 'feedcast-client';

import helpers from './../scripts/helpers'
import Helmet from 'react-helmet';

import Pagination from './Pagination'
import EpisodeCard from './EpisodeCard'
import FeedcastLoader from './FeedcastLoader'

import './../styles/EpisodesList.sass'

export default class EpisodesList extends Component {


  constructor(props) {
    super(props);

    let {lc} = helpers.localize(this)

    this.state = {
      page: 1,
      per_page: 30,
      populated: false,
      total: null,
      episodes: [],
      lc
    }

  }


  componentDidMount() {
    this._isMounted = true
    this.updateEpisodes(this.props);
  }


  componentWillUnmount() {
    this._isMounted = false
  }


  componentWillReceiveProps(nextProps) {
    if(this.props.params.page !==
        nextProps.params.page){
      this.updateEpisodes(nextProps)
    }
  }



  updateEpisodes( props ){
    const { per_page } = this.state
    const { params } = props

    const page = params.page !== undefined ? parseInt(params.page) : 1;

    feedcastApi
      .getEpisodes({
        page,
        per_page
      })
      .then(data => {
        if ( this._isMounted ){
          this.setState({
            page,
            populated: true,
            total: data.total,
            episodes: data.episodes
          });
        }
      })
  }


  cards(){
    const { episodes, lc } = this.state

    return episodes.length > 0 ?
            episodes.map(e => <EpisodeCard key={e.uuid} episode={e}/>):
            (<h1>{lc.noEpisodesFound}</h1>)
  }



  render(){
    const episodes = this.cards();
    const { lc } = this.state
    return this.state.populated ? (
      <div className="feedcast__last-episodes feedcast__section">
        <Helmet
          title={`Feedcast | Últimos Episódios`}
          meta={[
            {property: 'og:title',
            content: `Feedcast | Últimos Episódios`},
          ]} />
        <h4> {lc.recentEpisodes} </h4>
        <div className="feedcast__episodes-list">
          {episodes}
          <Pagination
            url={`/lastEpisodes/`}
            page={this.state.page}
            per_page={this.state.per_page}
            total={this.state.total}
            theme="white" />
        </div>
      </div>
    ) : (
      <FeedcastLoader />
    )
  }
}
