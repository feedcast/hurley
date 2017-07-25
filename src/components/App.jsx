import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './../images/logo.svg';

import './../styles/App.sass';

import feedcastApi from './../scripts/feedcastApi'
import Search from './Search.jsx'
import PlayerFooter from './PlayerFooter.jsx'

class App extends Component {

  render() {

    return (
      <div className="feedcast">
        <div className="feedcast__header">
          <Link to="/" className="feedcast__logo-wrapper">
            <img src={logo} className="feedcast__logo" alt="logo" />
          </Link>
          <Search/>
        </div>
        <div className="feedcast__navbar">
          <Link to="/"><i className="fa fa-home"></i> Home</Link>
          <Link activeClassName="active" to="/lastEpisodes"><i className="fa fa-history"></i> Episódios</Link>
          <Link activeClassName="active" to="/channels"><i className="fa fa-rss"></i> Canais</Link>
        </div>
        <div className="feedcast__container">
          {this.props.children}
        </div>
        <PlayerFooter />
      </div>
    );
  }
}

export default App;
