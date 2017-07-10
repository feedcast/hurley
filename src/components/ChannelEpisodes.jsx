import React, { Component } from 'react'
import feedcastApi from './../scripts/feedcastApi'

class ChannelEpisodes extends Component {

  constructor(){
    super();

    this.state = {
      episodes : [],
      page : 1,
      uuid: null
    }
  }

  componentWillReceiveProps(nextProps){
    const {data} = nextProps

    feedcastApi
      .getChannelEpisodes(data)
      .then( res => {
        console.log(res.episodes)
        this.setState({
          episodes : res.episodes,
          page : data.page,
          uuid : data.uuid
        })
      })
  }


  listEpisodes(){
    let list = this.state.episodes.map( (i, n) =>(
      <div key={n}>
        <h4>{i.title}</h4>
        <p>{i.summary}</p>
      </div>
    ))
    return this.state.episodes.length > 0 ? list : '';
  }



  render(){
    let list = this.listEpisodes();
    return (
      <div>
        <h1>Lista de Episódios</h1>
        {list}
      </div>
    )
  }
}


export default ChannelEpisodes
