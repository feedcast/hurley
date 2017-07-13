import React, { Component } from 'react'
import { Link } from 'react-router'

import './../styles/Pagination.css'

class Pagination extends Component {
  constructor(props) {
    super(props);
  }


  getPaginationButtons(){
    let { url, total, per_page, page} = this.props;
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
          to={`${url}${i}`}
          className={i == page ? 'active':''}>
          <button>{i}</button>
        </Link>
      ))

    return totalPages > 0 ? (
      <div className="feedcast__pagination-wrapper">
        <Link to={`${url}${
          page > 1?
          (page - 1) : 1}`} >
          <button>
            <i className="fa fa-angle-double-left"></i>
          </button>
        </Link>
        {buttons}
        <Link to={`${url}${
          page < totalPages?
          (page + 1) : totalPages}`}>
          <button>
            <i className="fa fa-angle-double-right"></i>
          </button>
        </Link>
      </div>
    ) : ''
  }


  render(){

    const paginateBtns = this.getPaginationButtons();
    const theme = this.props.theme ? this.props.theme : 'blue'

    return (
      <div className={`feedcast__pagination feedcast__pagination--${theme}`}>
        {paginateBtns}
      </div>
    )
  }
}


export default Pagination
