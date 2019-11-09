import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import ItemDescription from './ItemDescription';
import ItemShipping from './ItemShipping';
import Info from './Info';



class Item extends Component {
  state = {
    item: null,
  };

  componentDidMount() {
    const id =this.props.match.params.itemId;
    axios.get(`http://localhost:5000/items/${id}`)
      .then(res => {
        console.log(res)
        this.setState({ item: res.data })
      })
      .catch(err => console.log(err));
  }

  updateForm = e => {
    e.preventDefault();
    this.props.setUpdateForm(this.state.item);
  }

  deleteItem = e => {
    e.preventDefault();
    this.props.deleteItem(this.state.item.id);
  };

  render() {
    const { item } = this.state;

    if (!this.state.item) {
      return (
        <Info />
      );
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
          <NavLink exact to={`/item-list/${item.id}`} activeClassName="active">Description</NavLink>
          <NavLink to={`/item-list/${item.id}/shipping`} activeClassName="active">Shipping</NavLink>
        </nav>
        <Route exact path="/item-list/:itemId" render={props => <ItemDescription {...props} item={item} />} />
        <Route path="/item-list/:itemId/shipping" render={props => <ItemShipping {...props} item={item} />} />
        <button onClick={this.deleteItem} className="md-button">
          Delete Item
        </button>
        <button onClick={this.updateForm} className="md-button">
          Update Item
        </button>
      </div>
    );
  }
}

export default Item;
