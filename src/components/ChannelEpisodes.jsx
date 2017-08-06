import React, { Component } from 'react'
import { Link } from 'react-router';
import feedcastApi from 'feedcast-client';
import helpers from './../scripts/helpers'

import ChannelEpisode from './ChannelEpisode.jsx'
import Pagination from './Pagination'

class ChannelEpisodes extends Component {

  constructor(){
    super();

    let {lc} = helpers.localize(this)

    this.state = {
      episodes : [],
      per_page: 10,
      page : 1,
      uuid: null,
      total: null,
      lc
    }
  }

  componentDidMount() {
    this.updateList(this.props)
  }

  componentWillReceiveProps(nextProps){
    this.updateList(nextProps)
  }


  updateList(props){
    const {data} = props
    const page = typeof data.page === 'string' ?
                parseInt(data.page) : 1;
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


  render(){
    const {lc} = this.state
    const list = this.listEpisodes();


    return (
      <div className="feedcast__channelEpisodes">
        <h1>{lc.episodes}</h1>
        {list}
        <Pagination
          url={`/channel/${this.state.uuid}/`}
          page={this.state.page}
          per_page={this.state.per_page}
          total={this.state.total}
          theme="white" />
      </div>
    )
  }
}


export default ChannelEpisodes
