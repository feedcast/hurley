import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playEpisode } from 'app/actions/player';
import { Link } from 'react-router-dom'

import feedcastApi from 'feedcast-client'
import helpers from 'app/scripts/helpers'
import ReactDisqusComments from 'react-disqus-comments';

import 'app/styles/episode.sass'

const DISQUS_SHORTNAME = process.env.REACT_APP_DISQUS_SHORTNAME || 'default';

class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      published_at: '',
      description: '',
      summary: '',
      channel: {},
      audio : {},
      title: '',
      slug: '',
      uuid: '',
    }
  }

  componentDidMount() {
    const { slug, episode_slug} = this.props.match.params
    feedcastApi
      .getEpisode({slug, episode_slug})
      .then( data => {
        this.setState(data)
      })
      .catch( e => {
        console.log(e.message)
      })
  }

  handleNewComment(comment) {
    console.log(comment.text);
  }

  playEpisode(){
    this.props.dispatch(
      playEpisode(this.state, [])
    );
  }

  render() {
    const { slug, episode_slug} = this.props.match.params

    const {
      title,
      summary,
      description,
      channel,
    } = this.state

    const html = description && description.length > 0 ? description : (
      summary && summary.length > 0 ? summary : ''
    );
    console.log(description, summary)

    return (
      <div className="feedcast__episode">
        <div className="feedcast__section feedcast__episode-header">
          <div className="feedcast__episode-bg" style={{backgroundImage:`url(${channel.image_url})`}}></div>
          <div className="feedcast__episode-overlay"></div>
          <div
            className="feedcast__episode-channel"
            style={{backgroundImage:`url(${channel.image_url})`}}>
            <button
              onClick={() => this.playEpisode()}
              className="feedcast__episode-button">
              <i className="fa fa-play-circle"></i>
            </button>
          </div>
          <div className="feedcast__episode-info">
            <h3>{title}</h3>
            <h5>
              <Link to={`/${channel.slug}`} >{channel.title}</Link>
            </h5>
          </div>
        </div>
        <div className="feedcast__section">
          <p
            className="feedcast__sanitize"
            dangerouslySetInnerHTML={{
              __html: helpers.sanitize(html)
            }}>
          </p>
        </div>
        <div className="feedcast__section">
          <ReactDisqusComments
            shortname={DISQUS_SHORTNAME}
            identifier={`${slug}/${episode_slug}`}
            title={title}
            url={window.location.href}
            category_id={ channel.slug }
            onNewComment={this.handleNewComment}/>
        </div>
      </div>
    )
  }
}

export default connect()(Episode)
