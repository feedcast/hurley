import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import feedcastApi from './../scripts/feedcastApi'

import './../styles/channel.sass'
import ChannelEpisodes from './../components/ChannelEpisodes.jsx'


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
      uuid: '',
      populated: false
    }
  }



  componentWillMount() {
    const { uuid } = this.props.params
    feedcastApi
      .getChannelInfo({ uuid })
      .then(data => {
        data.populated = true
        this.setState(data)
      })
  }



  render() {
    let { categories, description,
      image_url, title, uuid } = this.state

    let { page } = this.props.params

    categories = categories.map( (i,n) => (
      <Link key={n} to={`/categories/${i.slug}`}>
        <i className={`fa fa-${i.icon}`}></i> {i.title}
      </Link>
    ));

    let channelInfo = this.state.populated ? (
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
    ) : (
        <div className="feedcast__channelInfo">
        </div>
    );

    let metaTitle = this.state.populated ? `| ${this.state.title}` : ``

    return (
      <div className="feedcast__channelPage">
        <Helmet
          title={`Feedcast ${metaTitle}`}
          meta={[
            {property: 'og:title',
            content: `Feedcast ${metaTitle}`},
          ]} />
        {channelInfo}
        <ChannelEpisodes data={{uuid, page}}/>
      </div>
    );
  }
}

export default Channel;
