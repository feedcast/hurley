import React, { Component } from 'react';
import feedcastApi from 'feedcast-client'
import ReactDisqusComments from 'react-disqus-comments';


export default class Episode extends Component {
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


  render() {
    const { slug, episode_slug} = this.props.match.params

    const {
      title,
      summary,
      description,
      channel,
    } = this.state

    return (
      <div>
        <div className="feedcast__section">
          <h3>{title}</h3>
          <p>{summary.length > 0 ? summary : description }</p>
        </div>
        <div className="feedcast__section">
          <ReactDisqusComments
            shortname="feedcast"
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
