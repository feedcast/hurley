import React, { Component } from 'react';
import { Link } from 'react-router';

import feedcastApi from './../scripts/feedcastApi'

import './../styles/channel.css'

class Channel extends Component {
  constructor(){
    super();

    this.state = {
      categories : [],
      description: '',
      feed_url: '',
      image_url: '',
      listed: false,
      slug: '',
      synchronization_status: '',
      synchronization_status_message: '',
      title: '',
      uuid: ''
    }
  }



  componentWillMount() {
    const { uuid } = this.props.params
    feedcastApi
      .getChannelInfo({ uuid })
      .then(data => {
        this.setState(data)
      })
  }



  render() {
    let {
      categories,
      description,
      feed_url,
      image_url,
      listed,
      slug,
      synchronization_status,
      synchronization_status_message,
      title,
      uuid
    } = this.state

    categories = categories.map( (i,n) => (
      <Link key={n} to={`categories/${i.slug}`}>
        <i className={`fa fa-${i.icon}`}></i> {i.title}
      </Link>
    ))

    return (
      <div className="feedcast__channelPage">
        <div className="feedcast__channelInfo">
          <div className="feedcast__channelInfo-header">
            <img className="feedcast__channelInfo-img" src={image_url}/>
            <h1 className="feedcast__channelInfo-title">{title}</h1>
          </div>
          <div className="feedcast__channelInfo-body">
            <p className="feedcast__channelInfo-description">{description}</p>
            <div className="feedcast__channelInfo-categories">{categories}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Channel;
