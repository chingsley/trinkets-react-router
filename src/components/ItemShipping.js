import React from 'react';

const ItemShipping = props => {
  return (
    <div>
      <p className="item-description">{props.item.shipping}</p>
    </div>
  );
};

export default ItemShipping;
