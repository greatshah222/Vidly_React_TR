import React from 'react';
import '../Modules/navBar.css';

export default function NavBar({ numItem }) {
  return (
    <div className='navbar'>
      <h2>BrandName</h2>
      <ul>
        <li>Links</li>
        <li>
          Number Of item: <span className='badge'>{numItem}</span>
        </li>
      </ul>
    </div>
  );
}
