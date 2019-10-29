import React from 'react';

const ItemDescription = props => {
  return (
    <div>
      <p className="item-description">{props.item.description}</p>
    </div>
  );
};

export default ItemDescription;
