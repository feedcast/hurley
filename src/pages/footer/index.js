import helpers from 'app/scripts/helpers'
import dictionary from 'app/scripts/helpers/dictionary'
import React, { Component } from 'react';
import { connect } from  'react-redux';

class Footer extends Component {
  render(){
    return (
      <div className={`feedcast__container-footer feedcast__container-footer--${this.props.episode !== null ? 'active':'inactive'}`}>
        <p className="feedcast__select-language">
          <i className="fa fa-globe"></i>
          <select
            onChange={(e)=>{helpers.setLanguage(e.target.value)}}
            value={helpers.language.lang}>
          {Object.keys(dictionary).map((i, n) => {
              return (<option key={n} value={i}>{dictionary[i].alias}</option>)
          })}
          </select>
        </p>
        <p>
          <a href="https://facebook.com/feedcast" target="_blank">
            <i className="fa fa-facebook"></i>
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
