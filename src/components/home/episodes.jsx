import React, { Component } from 'react'
import feedcastApi from 'feedcast-client';
import helpers from './../../scripts/helpers'
import Helmet from 'react-helmet';

import EpisodeCard from './../EpisodeCard'

import './../../styles/EpisodesList.sass'

export default class Episodes extends Component {


  constructor(props) {
    super(props);

    let { lc } = helpers.localize(this)

    this.state = {
      page: 1,
      per_page: 10,
      populated: false,
      total: null,
      episodes: [],
      loading: false,
      lc
    }

  }


  componentDidMount() {
    this._isMounted = true
    this._isLoading = false
    this.updateEpisodes();
  }


  componentWillUnmount() {
    this._isMounted = false
  }




  updateEpisodes(){
    const { per_page, page, episodes } = this.state
    if(!this._isLoading){
      this._isLoading = true

      feedcastApi
        .getEpisodes({
          page,
          per_page
        })
        .then(data => {
          this._isLoading = false
          if ( this._isMounted ){
            let ep = episodes
            for( let i in data.episodes)
              ep.push(data.episodes[i])
            this.setState({
              page,
              populated: true,
              total: data.total,
              episodes: ep,
              loading: false
            });
          }
        })
    }
  }


  cards(){
    const { episodes } = this.state

    return episodes.length > 0 ?
            episodes.map((e, i) => <EpisodeCard key={i} episode={e}/>):''
  }


  loadMore(){
    let { page } = this.state
    this.setState({page: ++page, loading: true}, () => this.updateEpisodes())
  }



  render(){
    const { lc } = this.state
    const episodes = this.cards();
    const loadMoreBtn = this.state.loading ?
      (<h5>{lc.loading}...</h5>):
      (<button
        onClick={()=>this.loadMore()}>
        {lc.loadMore}
      </button>)


    return (
      <div className="feedcast__last-episodes">
        <h3> {lc.recentEpisodes} </h3>
        <div className="feedcast__episodes-list">
          {episodes}
          <div className="feedcast__load-more">
            { this.state.episodes.length > 0 ? loadMoreBtn : ''}
          </div>
        </div>
      </div>
    )
  }
}
