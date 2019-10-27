import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import items from '../data';


function Item(props) {
  const id = props.match.params.itemId;
  const item = items.find(item => `${item.id}` === id);

  if(!item) {
    return <h2>Loading Data...</h2>;
  }

  return (
    <div className="item-wrapper">
      <div className="item-header">
        <div className="image-wrapper">
          <img src={item.imageUrl} alt={item.name} />
        </div>
        <div className="item-title-wrapper">
          <h2>{item.name}</h2>
          <h4>${item.price}</h4>
        </div>
      </div>
      <div>
        <p className="item-description">{item.description}</p>
      </div>
    </div>
  );
}

export default Item;
