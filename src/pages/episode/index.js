import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playEpisode } from 'app/actions/player';

import feedcastApi from 'feedcast-client'
import helpers from 'app/scripts/helpers'
import ReactDisqusComments from 'react-disqus-comments';

import 'app/styles/episode.sass'

const DISQUS_SHORTNAME = process.env.REACT_APP_DISQUS_SHORTNAME;

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

    return (
      <div className="feedcast__episode">
        <div className="feedcast__section">
          <h3 className="feedcast__episode-title">
            {title}
          </h3>
          <p
            className="feedcast__sanitize"
            dangerouslySetInnerHTML={{
              __html: helpers.sanitize(html)
            }}>
          </p>
          <button
            onClick={() => this.playEpisode()}
            className="feedcast__episode-button">
            <i className="fa fa-play"></i>
          </button>
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
