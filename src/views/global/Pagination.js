import React, { Component } from 'react';

export default class Pagination extends Component {
  constructor() {
    super();
    this.firstPage = this.firstPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }
  firstPage() {
    this.props.handlePage(1);
  }
  prevPage() {
    this.props.handlePage(this.props.page - 1);
  }
  nextPage() {
    this.props.handlePage(this.props.page + 1);
  }
  lastPage() {
    const { count, size } = this.props;
    let last = null;
    if (count > size) {
      last = Math.floor(count / size);
    } else if (count === size) {
      last = count / size;
    } else {
      last = 1;
    }
    this.props.handlePage(last);
  }
  render() {
    const {
      page, count, size,
    } = this.props;
    return (
      <nav aria-label='Page navigation'>
        <ul className='pagination justify-content-center'>
          {
            page !== 1 ?
            /* eslint-disable-next-line */
            <li className='page-item' onClick={ this.firstPage }>
              <div className='page-link cursor-pointer' tabIndex='-1'>First</div>
            </li> :
            /* eslint-disable-next-line */
            <li className='page-item disabled'>
              <div className='page-link cursor-pointer' tabIndex='-1'>First</div>
            </li>
          }
          {
            page !== 1 ?
            /* eslint-disable-next-line */
            <li className='page-item' onClick={ this.prevPage }>
              <div className='page-link cursor-pointer' tabIndex='-1'>Previous</div>
            </li> :
            /* eslint-disable-next-line */
            <li className='page-item disabled'>
              <div className='page-link cursor-pointer' tabIndex='-1'>Previous</div>
            </li>
          }
          <li className='page-item'><div className='page-link'>{page}</div></li>
          {
            Math.floor(count / size) !== page ?
            /* eslint-disable-next-line */
            <li className='page-item' onClick={ this.nextPage }>
              <div className='page-link cursor-pointer' tabIndex='-1'>Next</div>
            </li> :
            /* eslint-disable-next-line */
            <li className='page-item disabled'>
              <div className='page-link cursor-pointer' tabIndex='-1'>Next</div>
            </li>
          }
          {
            Math.floor(count / size) !== page ?
            /* eslint-disable-next-line */
            <li className='page-item' onClick={ this.lastPage }>
              <div className='page-link cursor-pointer' tabIndex='-1'>Last</div>
            </li> :
            /* eslint-disable-next-line */
            <li className='page-item disabled'>
              <div className='page-link cursor-pointer' tabIndex='-1'>Last</div>
            </li>
          }
        </ul>
      </nav>
    );
  }
}
