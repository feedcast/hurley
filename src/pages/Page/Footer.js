import helpers from 'app/scripts/helpers'
import dictionary from 'app/scripts/helpers/dictionary'
import React, { Component } from 'react';
import { connect } from  'react-redux';

import i18n from 'app/i18n';

const languages = [
  { code: 'en', title: 'english' },
  { code: 'pt', title: 'portuguese' }
]

class Footer extends Component {
  render(){
    return (
      <div className={`feedcast__container-footer feedcast__container-footer--${this.props.episode !== null ? 'active':'inactive'}`}>
        <p className="feedcast__select-language">
          <i className="fa fa-globe"></i>
          <select
            onChange={(e)=>{i18n.changeLanguage(e.target.value)}}
            value={helpers.language.lang}>
          {languages.map((language, n) => {
              return (<option key={n} value={language.code}>{language.title}</option>)
          })}
          </select>
        </p>
        <p>
          <a href="https://facebook.com/feedcast" target="_blank">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://twitter.com/feedcast_io" target="_blank">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="https://github.com/feedcast" target="_blank">
            <i className="fa fa-github"></i>
          </a>
          <a href="https://reddit.com/r/feedcast" target="_blank">
            <i className="fa fa-reddit"></i>
          </a>
        </p>
      </div>
    )
  }
}

export default connect(state => state.player)(Footer);
