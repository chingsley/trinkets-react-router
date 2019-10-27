import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import ItemList from './components/ItemList';
import Item from './components/Item';

import './styles.css';

import data from './data';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.setState({ items: data });
  }

  render() {
    return (
      <div className="App">
        <nav>
          <h1 className="store-header">Kingsley's Trinkets</h1>
          <div className="nav-links">
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
            <NavLink to="/shop" activeClassName="active">Shop</NavLink>
          </div>
        </nav>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={ItemList} />
        <Route path="/shop/:itemId" component={Item} />
      </div>
    );
  }
}

export default App;
