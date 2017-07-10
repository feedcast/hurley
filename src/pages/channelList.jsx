import React, { Component } from 'react';
import { Link } from 'react-router';
import './../styles/channelList.css';

import feedcastApi from './../scripts/feedcastApi'

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


  navigation(){
    let { channels, total, per_page, page} = this.state;
    let totalPages = parseInt(total / per_page);

    if(total % per_page > 0)
      totalPages++;

    let pages = []

    pages[1] = 1
    pages[page - 1] = page - 1
    pages[page] = page
    pages[page + 1] = page + 1
    pages[totalPages] = totalPages

    let buttons = pages
                    .filter(i => i > 0 && i <= totalPages)
                    .map(i=>(
        <Link
          key={i}
          to={`channels/${i}`}
          className={i == page ? 'active':''}>
          <button>{i}</button>
        </Link>
      ))

    return totalPages > 0 ? (
      <div className="feedcast__channel-navigation">
        <Link to={`channels/${
          this.state.page > 1?
          (this.state.page - 1) : 1}`} >
          <button>
            <i className="fa fa-angle-double-left"></i>
          </button>
        </Link>
        {buttons}
        <Link to={`channels/${
          this.state.page < totalPages?
          (this.state.page + 1) : totalPages}`}>
          <button>
            <i className="fa fa-angle-double-right"></i>
          </button>
        </Link>
      </div>
    ) : ''
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
    let Navigation = this.navigation();
    return (
      <div className="feedcast__channel-list">
        {channelList}
        {Navigation}
      </div>
    );
  }
}

export default ChannelList;
