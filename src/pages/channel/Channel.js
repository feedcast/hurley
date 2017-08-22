import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import helpers from 'app/scripts/helpers'

import 'app/styles/channel.sass'
import ChannelEpisodes from 'app/components/ChannelEpisodes'

class Channel extends Component {
  renderCategories(categories) {
    return categories
      .filter( (i,n)=> n < 3 )
      .map( (i,n) => (
      <Link key={n} to={`/category/${i.slug}`}>
        <i className={`fa fa-${i.icon}`}></i> {i.title}
      </Link>
    ));
  }

  render() {
    if (!this.props.channel) {
      return null;
    }

    const {
      description,
      image_url,
      title,
      categories,
    } = this.props.channel;

    const metaTitle = this.props.channel ? "| " + title: '';

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
            <img className="feedcast__channelInfo-img" alt={title} src={image_url}/>
            <h1 className="feedcast__channelInfo-title">{title}</h1>
          </div>
          <div className="feedcast__channelInfo-body">
            <p
              className="feedcast__sanitize feedcast__channelInfo-description"
              dangerouslySetInnerHTML={{
                __html: helpers.sanitize(description)
              }}>
            </p>
            <div className="feedcast__channelInfo-categories">
              {this.renderCategories(categories)}
            </div>
          </div>
        </div>
        <ChannelEpisodes
          channel={ this.props.channel }
          page={ parseInt(this.props.match.params.page||'1') }
        />
      </div>
    );
  }
}

export default Channel;
