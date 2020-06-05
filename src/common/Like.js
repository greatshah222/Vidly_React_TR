import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function Like({ onClick, liked }) {
  const heartColor = !liked ? 'pink' : 'red';
  return (
    <FaHeart
      onClick={onClick}
      color={heartColor}
      size='1rem'
      cursor='pointer'
    />
  );
}
