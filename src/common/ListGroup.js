import React from 'react';

export default function ListGroup({
  items,
  onItemSelect,
  selectedGenre,
  onAllItemSelect,
}) {
  return (
    <ul>
      <li
        onClick={onAllItemSelect}
        className={selectedGenre === '' ? 'active' : ''}
      >
        All Genre
      </li>
      {items.map((item) => (
        // the bracket notation means it will directly give the value of that property name
        <li
          onClick={() => onItemSelect(item)}
          key={item._id}
          className={item === selectedGenre ? 'active' : ''}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
