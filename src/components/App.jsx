import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './../images/logo.svg';

import './../styles/App.sass';

import feedcastApi from './../scripts/feedcastApi'
import Search from './Search.jsx'
import PlayerFooter from './PlayerFooter.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      populated: false,
      showSidebar: false
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

  toggleSidebar(bol){
    if(bol && Boolean == typeof bol){
      this.setState({ showSidebar: bol })
    } else {
      this.setState({ showSidebar: ! this.state.showSidebar});
    }
  }

  render() {

    return (
      <div className="feedcast">
        <div className="feedcast__header">
          <button
            onClick={()=>{this.toggleSidebar(true)}}
            className="feedcast__sidebar-toggle">
            <i className="fa fa-bars"></i>
          </button>
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
        <div
          onClick={()=>{this.toggleSidebar(false)}}
          className={`feedcast__sidebar-overlay feedcast__sidebar-overlay--${this.state.showSidebar ? 'show':'hide'}`}></div>
        <div className={`feedcast__sidebar feedcast__sidebar--${this.state.showSidebar ? 'show':'hide'}`}>
          <div className="feedcast__sidebar-wrapper">
            <h5>Links Importantes</h5>
            <Link onClick={()=>{this.toggleSidebar(false)}} to="/"><i className="fa fa-home"></i> Home</Link>
            <Link onClick={()=>{this.toggleSidebar(false)}} activeClassName="active" to="/lastEpisodes"><i className="fa fa-history"></i> Episódios</Link>
            <Link onClick={()=>{this.toggleSidebar(false)}} activeClassName="active" to="/channels"><i className="fa fa-rss"></i> Canais</Link>
            <h5>Categorias</h5>
            { this.state.categories.map((c, i)=>(
            <Link onClick={()=>{this.toggleSidebar(false)}} key={i} to={`/category/${c.slug}`}>
              <i className={`fa fa-${c.icon}`}></i> {c.title}
            </Link>))}
          </div>
        </div>
        <PlayerFooter />
      </div>
    );
  }
}

export default App;
