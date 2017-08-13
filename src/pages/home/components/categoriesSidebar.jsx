import React from 'react';
import { Link } from 'react-router';

export default class CategoriesSidebar extends React.Component {

  render(){
    return (
      <div className="feedcast__categories-sidebar">
        { this.props.categories.map((c, i)=>(
          <Link key={i} to={`/category/${c.slug}`}>
            <i className={`fa fa-${c.icon}`}></i> {c.title}
          </Link>)) }
      </div>
    )
  }
}
