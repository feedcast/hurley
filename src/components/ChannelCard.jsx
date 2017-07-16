import React, { Component } from 'react'
import { Link } from 'react-router'

import helpers from './../scripts/helpers'

export default class ChannelCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageStatus : false,
      image_url : ''
    }
  }


  componentDidMount() {
    this.checkImage(this.props)
  }


  componentDidUpdate(prevProps) {
    if(this.props.data.image_url !==
        prevProps.data.image_url){
      this.checkImage(this.props)
    }
  }


  checkImage(props){
    let c = props.data
    helpers
      .testImage(c.image_url, 5000)
      .then(e => {
        this.setState({
          imageStatus: true })
      })
      .catch(e => {
        this.setState({
          imageStatus: false })
      })
  }


  thumbnail({image_url}){
    return this.state.imageStatus ? (
      <img
        src={image_url}
        className="feedcast__channel-img"
        onError={()=>this.setState({imageStatus: false})}
      />
    ) : (
      <div className="feedcast__channel-thumbnail">
        <i className="fa fa-podcast"></i>
      </div>
    )
  }

  render () {
    let c = this.props.data
    let thumb = this.thumbnail(c)

    return (
      <Link key={c.uuid} to={`/channel/${c.uuid}`}>
        <div className="feedcast__channel" id={c.uuid}>
          <div className="feedcast__channel-title">
            <h3>{c.title}</h3>
          </div>
          {thumb}
          <div className="feedcast__channel-overlay"></div>
        </div>
      </Link>
    )
  }

}
