import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './../images/logo.svg';

import './../styles/App.sass';

import feedcastApi from './../scripts/feedcastApi'
import helpers from './../scripts/helpers'
import Search from './Search.jsx'
import PlayerFooter from './PlayerFooter.jsx'

class App extends Component {
  constructor(props) {
    super(props);

    let { lc } = helpers.localize(this)

    this.state = {
      categories: [],
      populated: false,
      showSidebar: window.innerWidth >= 500,
      lc
    }
  }



  componentDidMount() {
    feedcastApi
    .getCategories()
    .then( data => {
        this.setState({
          categories : data.categories,
          populated: true
        })
    })
  }

  toggleSidebar(bol, ifMobile){
    if('boolean' === typeof ifMobile){
      if(ifMobile && window.innerWidth <= 500){
        this.setState({ showSidebar: bol })
      }
    } else {
      if(bol && 'boolean' === typeof bol){
        this.setState({ showSidebar: bol })
      } else {
        this.setState({ showSidebar: ! this.state.showSidebar});
      }
    }
  }

  render() {

    const { lc } = this.state

    return (
      <div className={`feedcast feedcast--sidebar-${this.state.showSidebar?'active':'inactive'}`}>
        <div className="feedcast__header">
          <button
            onClick={()=>{this.toggleSidebar()}}
            className="feedcast__sidebar-toggle">
            <i className="fa fa-bars"></i>
          </button>
          <Link to="/" className="feedcast__logo-wrapper">
            <img src={logo} className="feedcast__logo" alt="logo" />
          </Link>
        </div>
        <div className={`feedcast__container feedcast__sidebar--${this.state.showSidebar?'active':'inactive'}`}>
          {this.props.children}
        </div>
        <div
          onClick={()=>{this.toggleSidebar(false)}}
          className={`feedcast__sidebar-overlay feedcast__sidebar-overlay--${this.state.showSidebar ? 'show':'hide'}`}></div>
        <div className={`feedcast__sidebar feedcast__sidebar--${this.state.showSidebar ? 'show':'hide'}`}>
          <div className="feedcast__sidebar-wrapper">
            <h5>{lc.importantLinks}</h5>
            <Link onClick={()=>{this.toggleSidebar(false, true)}} to="/"><i className="fa fa-home"></i> {lc.home}</Link>
            <Link onClick={()=>{this.toggleSidebar(false, true)}} activeClassName="active" to="/lastEpisodes"><i className="fa fa-history"></i> {lc.episodes}</Link>
            <Link onClick={()=>{this.toggleSidebar(false, true)}} activeClassName="active" to="/channels"><i className="fa fa-rss"></i> {lc.channels}</Link>
            <h5>{lc.categories}</h5>
            { this.state.categories.map((c, i)=>(
            <Link onClick={()=>{this.toggleSidebar(false, true)}} key={i} to={`/category/${c.slug}`}>
              <i className={`fa fa-${c.icon}`}></i> {helpers.translate(c.title)} <span>{c.channels.length}</span>
            </Link>))}
          </div>
        </div>
        <PlayerFooter />
      </div>
    );
  }
}

export default App;
