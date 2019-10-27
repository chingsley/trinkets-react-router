import React from 'react';
import { Link } from 'react-router-dom';

import items from '../data';

function ItemList() {
  return (
    <div className="items-list-wrapper">
      {items.map(item => (
        <div className="item-card" key={item.id}>
          <img
            className="item-list-image"
            src={item.imageUrl}
            alt={item.name}
          />
          <Link to={`/shop/${item.id}`}><p>{item.name}</p></Link>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
