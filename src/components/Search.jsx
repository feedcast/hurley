import React, { Component } from 'react';
import { translate } from 'react-i18next';

import './../styles/search.sass';

export function Search({ t }) {
  const placeholder = t('commom.search-placeholder');
  return (
      <div className="feedcast__search">
        <input type="text"
          className="feedcast__search-input"
          placeholder={placeholder} />

        <button className="feedcast__search-button">
          <i className="fa fa-search"></i>
        </button>
      </div>
  );
}

export default translate()(Search);
