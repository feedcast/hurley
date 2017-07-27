import React, { Component } from 'react'
import { Link } from 'react-router'

export default class ChannelCard extends Component {
  render() {
    let { title, image_url, uuid } = this.props.channel
    return (
      <div className="feedcast__categories-channel-card">
        <Link to={`/channel/${uuid}`}>
          <img src={image_url}/>
          <h5>{title}</h5>
        </Link>
      </div>
    )
  }
}
