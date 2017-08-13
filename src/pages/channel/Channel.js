import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import helpers from 'app/scripts/helpers'

import 'app/styles/channel.sass'
import ChannelEpisodes from 'app/components/ChannelEpisodes'
import FeedcastLoader from 'app/components/FeedcastLoader'


class Channel extends Component {
  renderCategories() {
    return this.props.channel.categories.map( (i,n) => (
      <Link key={n} to={`/category/${i.slug}`}>
        <i className={`fa fa-${i.icon}`}></i> {helpers.translate(i.title)}
      </Link>
    ));
  }

  render() {
    if (!this.props.channel) {
      return null;
    }

    const {
      categories,
      description,
      image_url,
      title,
      uuid,
    } = this.props.channel;

    const { page } = this.props.params

    const metaTitle = this.props.channel ? `| ${title}` : ``

    return (
      <div className="feedcast__channelPage">
        <Helmet
          title={`Feedcast ${metaTitle}`}
          meta={[
            {property: 'og:title',
            content: `Feedcast ${metaTitle}`},
          ]} />
        <div className="feedcast__channelInfo">
          <div className="feedcast__channelInfo-header">
            <img className="feedcast__channelInfo-img" src={image_url}/>
            <h1 className="feedcast__channelInfo-title">{title}</h1>
          </div>
          <div className="feedcast__channelInfo-body">
            <p className="feedcast__channelInfo-description">{description}</p>
            <div className="feedcast__channelInfo-categories">
              { this.renderCategories.bind(this) }
            </div>
          </div>
        </div>
        <ChannelEpisodes {...this.props} />
      </div>
    );
  }
}

export default Channel;
