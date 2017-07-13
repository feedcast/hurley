import React, { Component } from 'react';
import { Link } from 'react-router';
import './../styles/channelList.css';

import feedcastApi from './../scripts/feedcastApi'

import Pagination from './../components/Pagination'

class ChannelList extends Component {

  constructor(){
    super();

    this.state = {
      total:null,
      page: 1,
      per_page: 24,
      channels: []
    }

  }


  updateList(){
    let {page, per_page} = this.state

    feedcastApi
      .getChannels({page, per_page})
      .then(data => {
      this.setState({
        page: parseInt(page),
        channels: data.channels,
        total: data.total
      });
    })
  }


  componentWillUpdate(nextProps) {
    if( this.props.params.page != nextProps.params.page)
      this.updatePage(nextProps);
  }


  componentWillMount(){
    this.updatePage(this.props)
  }


  updatePage(props){
    const { params } = props
    switch(!0){
      case params.page !== undefined &&
        parseInt(params.page) !== this.state.page &&
        parseInt(params.page) >= 0:

        this.setState({ page: parseInt(params.page) }, () => {
          this.updateList()
        });

      break;

      case Object.keys(params).length === 0:
        this.setState({ page: 1 }, () => {
          this.updateList()
        });
      break;

      case params.page !== undefined &&
        parseInt(params.page) == 1 &&
        parseInt(params.page) == this.state.page &&
        this.state.channels.length === 0:

        this.updateList();

      break;
    }
  }


  listChannels(){
    let { channels, total, per_page} = this.state;
    return channels.map( c => (
      <Link key={c.uuid} to={`channel/${c.uuid}`}>
        <div className="feedcast__channel" id={c.uuid}>
          <div className="feedcast__channel-title">
            <h3>{c.title}</h3>
          </div>
          <img src={c.image_url} className="feedcast__channel-img" />
          <div className="feedcast__channel-overlay"></div>
        </div>
      </Link> ));
  }


  render() {
    let channelList = this.listChannels()
    return (
      <div className="feedcast__channel-list">
        {channelList}
        <Pagination
          url="channels/"
          page={this.state.page}
          total={this.state.total}
          per_page={this.state.per_page}/>
      </div>
    );
  }
}

export default ChannelList;
