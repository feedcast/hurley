import React, { Component } from 'react'
import { Link } from 'react-router';
import feedcastApi from './../scripts/feedcastApi'

import ChannelEpisode from './ChannelEpisode.jsx'

class ChannelEpisodes extends Component {

  constructor(){
    super();

    this.state = {
      episodes : [],
      per_page: 10,
      page : 1,
      uuid: null,
      total: 50
    }
  }

  componentWillReceiveProps(nextProps){
    const {data} = nextProps
    let page = typeof data.page === 'string' ? parseInt(data.page) : 1
    feedcastApi
      .getChannelEpisodes(data)
      .then( res => {
        this.setState({
          episodes : res.episodes,
          page,
          uuid : data.uuid,
          total: res.total
        })
      })
  }


  listEpisodes(){
    let list = this.state.episodes.map( (i, n) =>
      <ChannelEpisode key={n} episode={i}/> )
    return this.state.episodes.length > 0 ? list : '';
  }



    navigation(){
    //TODO: Abstract this method to a component
    //used in other places to
    let { episodes, total, per_page, page} = this.state;
    let totalPages = parseInt(total / per_page);

    if(total % per_page > 0)
      totalPages++;

    let pages = []

    pages[1] = 1
    pages[page - 1] = page - 1
    pages[page] = page
    pages[page + 1] = page + 1
    pages[totalPages] = totalPages

    let buttons = pages
                    .filter(i => i > 0 && i <= totalPages)
                    .map(i=>(
        <Link
          key={i}
          to={`channel/${this.state.uuid}/${i}`}
          className={i == page ? 'active':''}>
          <button>{i}</button>
        </Link>
      ))

    return episodes.length > 0 && totalPages > 0 ? (
      <div className="feedcast__channel-navigation
      feedcast__channel-navigation--episodes">
        <Link to={`channel/${this.state.uuid}/${
          this.state.page > 1?
          (this.state.page - 1) : 1}`} >
          <button>
            <i className="fa fa-angle-double-left"></i>
          </button>
        </Link>
        {buttons}
        <Link to={`channel/${this.state.uuid}/${
          this.state.page < totalPages?
          (this.state.page + 1) : totalPages}`}>
          <button>
            <i className="fa fa-angle-double-right"></i>
          </button>
        </Link>
      </div>
    ) : ''
  }



  render(){
    const list = this.listEpisodes();
    const navButtons = this.navigation();

    return (
      <div className="feedcast__channelEpisodes">
        <h1>Lista de Episódios</h1>
        {list}
        {navButtons}
      </div>
    )
  }
}


export default ChannelEpisodes
