import React, { Component } from 'react';
import feedcastApi from 'feedcast-client'


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
        alert('Podcast não encontrado ou algum erro: ' + e.message)
      })
  }

  render() {
    const {
      title,
      summary,
    } = this.state

    return (
      <div className="feedcast__section">
        <h3>{title}</h3>
        <p>{summary}</p>
      </div>
    )
  }

}
