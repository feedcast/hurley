import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ChannelCard extends Component {
  render() {
    let { title, image_url, slug } = this.props.channel
    return (
      <div className="feedcast__categories-channel-card">
        <Link to={`/${slug}`}>
          <img alt={title} src={image_url}/>
          <h5>{title}</h5>
        </Link>
      </div>
    )
  }
}
