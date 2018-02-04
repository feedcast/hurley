import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { translate } from 'react-i18next';

import { NavLink } from 'react-router-dom';
import logo from 'app/images/logo.svg';

import 'app/styles/App.sass';

import PlayerFooter from 'app/components/PlayerFooter';
import Footer from './Footer';

const FORM_LINK = process.env.REACT_APP_FEEDBACK_FORM_URL || '#';

const CategorieTitle = (slug, t) => t(`categorie.${slug.replace('-','_')}`)

export class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSidebar: false,
    }
  }

  //TODO: Change this is too confuse.
  toggleSidebar(fixed){
    this.setState({ showSidebar: fixed || !this.state.showSidebar});
  }

  render() {
    const t = this.props.t;

    return (
      <div className={`feedcast feedcast--sidebar-${this.state.showSidebar?'active':'inactive'}`}>
        <div className="feedcast__header">
          <button
            onClick={()=>{this.toggleSidebar()}}
            className="feedcast__sidebar-toggle">
            <i className="fa fa-bars"></i>
          </button>
          <NavLink to="/" className="feedcast__logo-wrapper">
            <img src={logo} className="feedcast__logo" alt="logo" />
          </NavLink>
        </div>
        <div className={`feedcast__container feedcast__sidebar--${this.state.showSidebar?'active':'inactive'}`}>
          <div className="feedcast__container-wrapper">
            {this.props.children}
          </div>
          <Footer t={t} />
        </div>
        <div
          onClick={()=>{this.toggleSidebar(false)}}
          className={`feedcast__sidebar-overlay feedcast__sidebar-overlay--${this.state.showSidebar ? 'show':'hide'}`}></div>
        <div className={`feedcast__sidebar feedcast__sidebar--${this.state.showSidebar ? 'show':'hide'}`}>
          <div className="feedcast__sidebar-wrapper">
            <NavLink exact onClick={()=>{this.toggleSidebar(false, true)}} activeClassName="active" to="/"><i className="fa fa-home"></i> {t('home.title')}</NavLink>
            <NavLink onClick={()=>{this.toggleSidebar(false, true)}} activeClassName="active" to="/episodes"><i className="fa fa-history"></i> {t('episodes.title')}</NavLink>
            <NavLink onClick={()=>{this.toggleSidebar(false, true)}} activeClassName="active" to="/channels"><i className="fa fa-rss"></i> {t('channels.title')}</NavLink>
            <NavLink onClick={()=>{this.toggleSidebar(false, true)}} activeClassName="active" to="/queue"><i className="fa fa-indent"></i> {t('queue.title')}</NavLink>
            <a href={FORM_LINK} target="_blank"><i className="fa fa-comments-o"></i> {t('common.feedback')}</a>
            <h5>{t('categories.title')}</h5>
            {
                this.props.categories
                  .sort((a,b)=>b.channels.length - a.channels.length)
                  .map((c, i)=>(
                    <NavLink
                      onClick={()=>{this.toggleSidebar(false, true)}}
                      key={i}
                      to={`/category/${c.slug}`}>
                      <i className={`fa fa-${c.icon}`}></i>
                      { this.props.t(`categories.${c.slug.replace('-','_')}`, c.title) }
                      <span>{ c.channels.length }</span>
                    </NavLink>))
              }
            </div>
        </div>
        <PlayerFooter />
      </div>
    );
  }
}

export default translate()(Page);
