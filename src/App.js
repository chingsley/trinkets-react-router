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
            <NavLink exact to="/item-list" activeClassName="active">Shop</NavLink>
          </div>
        </nav>
        <Route exact path="/" component={Home} />
        <Route exact path="/item-list" render={props => <ItemList {...props} items={this.state.items} />} />
        <Route path="/item-list/:itemId" render={props => <Item {...props} items={this.state.items} />} />
      </div>
    );
  }
}

export default App;
