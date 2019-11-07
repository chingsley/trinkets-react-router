import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import ItemList from './components/ItemList';
import Item from './components/Item';
import ItemForm from './components/ItemForm';

import './styles.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/items')
      .then(res => {
        // console.log(res);
        this.setState({ items: res.data });
      })
      .catch(err => console.log(err))
  }

  addItem = item => {
    axios
      .post('http://localhost:5000/items', item)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <nav>
          <h1 className="store-header">Kingsley's Trinkets</h1>
          <div className="nav-links">
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
            <NavLink exact to="/item-list" activeClassName="active">Shop</NavLink>
            <NavLink exact to="/new-item" activeClassName="active">Add Item</NavLink>
          </div>
        </nav>
        <Route exact path="/" component={Home} />
        <Route exact path="/item-list" render={props => <ItemList {...props} items={this.state.items} />} />
        <Route path="/item-list/:itemId" render={props => <Item {...props} items={this.state.items} />} />
        <Route path="/new-item" render={props => <ItemForm {...props} addItem={this.addItem} />} />
      </div>
    );
  }
}

export default App;
