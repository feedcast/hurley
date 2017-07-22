import React, { Component } from 'react'
import feedcastApi from './../scripts/feedcastApi'
import Helmet from 'react-helmet';

import Pagination from './Pagination'
import EpisodeCard from './EpisodeCard'
import FeedcastLoader from './FeedcastLoader'

import './../styles/EpisodesList.sass'

export default class EpisodesList extends Component {


  constructor(props) {
    super(props);


    this.state = {
      page: 1,
      per_page: 30,
      populated: false,
      total: null,
      episodes: [],
      populated: false
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

    //TODO: replace for getEpisodes
    //      when API timeout is fixed

    feedcastApi
      .getChannelEpisodes({
        page,
        per_page,
        uuid : '3ef4ed00-b7e6-0134-a084-324e5ee31c7c'
      })
      .then(data => {
        if ( this._isMounted ){
          this.setState({
            page,
            populated: true,
            total: data.total,
            episodes: data.episodes
          });
          feedcastApi.emit('episodeslist:populated')
        }
      })
  }


  cards(){
    const { episodes } = this.state

    return episodes.length > 0 ?
            episodes.map(e => <EpisodeCard key={e.uuid} episode={e}/>):
            (<h1>Nenhum episódio!</h1>)
  }



  render(){
    const episodes = this.cards();
    return this.state.populated ? (
      <div className="feedcast__last-episodes">
        <Helmet
          title={`Feedcast | Últimos Episódios`}
          meta={[
            {property: 'og:title',
            content: `Feedcast | Últimos Episódios`},
          ]} />
        <h4> Últimos episódios </h4>
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
