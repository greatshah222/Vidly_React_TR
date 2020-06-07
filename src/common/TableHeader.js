import React, { Component } from 'react';
import '../Modules/movie.css';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// as a props should get
// columns:array
// sortColumn:object
// onSort:function

export class TableHeader extends Component {
  raiseSort = (path) => {
    // for making this component reusuabl
    const sortColumn = { ...this.props.sortColumn };
    // if(the ) path supplied by user is same as not previosly it means they want in descs
    if (sortColumn.path === path) {
      // alter the sort order if it was asc make it desc or if it was desc make it asc
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };
  renderSortIcon = (column) => {
    if (column.path !== this.props.sortColumn.path) return null;

    if (this.props.sortColumn.order === 'asc') {
      return <FaSortUp size='1rem' cursor='pointer' />;
    }
    return <FaSortDown size='1rem' cursor='pointer' />;
  };
  render() {
    return (
      <>
        <thead>
          <tr>
            {this.props.columns.map((column) => (
              <th
                key={column.path || column.key}
                className='table-heading-primary'
                onClick={() => this.raiseSort(column.path)}
              >
                {column.label}
                {/* renderSortIcon is for fetching the icon so we have given the paranthesis  */}
                {this.renderSortIcon(column)}
              </th>
            ))}
          </tr>
        </thead>
      </>
    );
  }
}

export default TableHeader;
