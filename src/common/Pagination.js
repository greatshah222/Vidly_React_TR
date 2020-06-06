import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

// fo rbugChecking we need to install a libray called PropTypes from npm
// npm i prop-types

// Greeting.propTypes = {
//     name: PropTypes.string
//   };
//   PropTypes exports a range of validators that can be used to make sure the data you receive is valid. In this example, we’re using PropTypes.string. When an invalid value is provided for a prop, a warning will be shown in the JavaScript console. For performance reasons, propTypes is only checked in development mode.

export default function Pagination({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}) {
  const pagesCount = itemsCount / pageSize;
  // this is just a single num. fo rexample if there are 8 movies then the pagesCOUNT WILL BE 2 SINCE THE PAGESIZE IS 4.
  // now we need tomap from 1 to pagesCount(used lodash package so npm i lodash)
  const pages = _.range(1, pagesCount + 1);
  // +1 cause last num is not included in the lodash . range field. will return an array from 1 to pagesCOunt

  if (pages.length > 1) {
    return (
      // here pages are just an array of number so u can put them direclty in button
      // whenever the page is clicked in the pagination link the page is sent to the handler using the parameter and then the state of page is changed. the currentPage is initialized  with the value of 1
      <div>
        <div className='pagination'>
          {pages.map((page) => (
            <button
              className={page === currentPage ? 'active' : ''}
              onClick={() => onPageChange(page)}
              key={page}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
// just for checking we have passed the right thing as props we need propTypes
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
