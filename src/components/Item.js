import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import ItemDescription from './ItemDescription';
import ItemShipping from './ItemShipping';



function Item(props) {
  const id = props.match.params.itemId;
  const item = props.items.find(item => `${item.id}` === id);

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
      <nav className="item-sub-nav">
        <NavLink exact to={`/item-list/${id}`} activeClassName="active">Description</NavLink>
        <NavLink to={`/item-list/${id}/shipping`} activeClassName="active">Shipping</NavLink>
      </nav>
      <Route exact path="/item-list/:itemId" render={props => <ItemDescription {...props} item={item} />} />
      <Route path="/item-list/:itemId/shipping" render={props => <ItemShipping {...props} item={item} />} />
    </div>
  );
}

export default Item;
