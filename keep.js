import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import ItemList from './components/ItemList';
import Item from './components/Item';
import ItemForm from './components/ItemForm';
import UpdateForm from './components/UpdateForm';

import './styles.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      activeItem: null,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/items')
      .then(res => {
        const indexOfEdit = this.props.location.pathname.indexOf('/edit');
        let activeItem = null;
        if (indexOfEdit > -1 && !this.state.activeItem) {
          const id = this.props.location.pathname[indexOfEdit - 1]
          activeItem = res.data.find(item => `${item.id}` === `${id}`)
          // this.setState({ activeItem: activeItem })
        }
        this.setState({ items: res.data, activeItem: activeItem });
      })
      .catch(err => console.log(err))
  }


  addItem = item => {
    axios
      .post('http://localhost:5000/items', item)
      .then(res => {
        this.setState({ items: res.data })
        this.props.history.push('/item-list'); // we have access to 'history' here because we wrapped this App component with the 'withRouter' HOC (see the last line of code)
      })
      .catch(err => console.log(err));

  };


  updateItem = updatedItem => {
    axios
      .put(`http://localhost:5000/items/${updatedItem.id}`, updatedItem)
      .then(res => {
        this.setState({ items: res.data });
        this.props.history.push('/item-list');;
      })
      .catch(err => console.log(err));
  };

  setUpdateForm = item => {
    this.setState({ activeItem: item });
    this.props.history.push(`/item-list/${item.id}/edit`);
  };

  deleteItem = id => {
    axios
      .delete(`http://localhost:5000/items/${id}`)
      .then(res => {
        this.setState({ items: res.data })
        this.props.history.push('/item-list');
      })
      .catch(err => console.log(err));
  };

  render() {
    // const isEditing = this.props.location.pathname.indexOf('/edit') > -1;
    // console.log('isEditing ===================', isEditing);
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
        <Route
          exact
          path="/item-list/:itemId"
          render={props => (
            <Item
              {...props}
              items={this.state.items}
              deleteItem={this.deleteItem}
              setUpdateForm={this.setUpdateForm}
            />

          )}
        />
        <Route
          path="/new-item"
          render={props => (
            <ItemForm
              {...props}
              addItem={this.addItem}
            />
          )}
        />
        <Route
          path="/item-list/:itemId/edit"
          render={props => (
            <UpdateForm
              {...props}
              updateItem={this.updateItem}
              activeItem={this.state.activeItem}
            />
          )}
        />
        {/* <Route
          // path={this.state.activeItem ? "/item-list/:itemId/edit": "/new-item"}
          path={isEditing ? "/item-list/:itemId/edit": "/new-item"}
          // path={"/new-item"}
          render={props => (
            <ItemForm
              {...props}
              addItem={this.addItem}
              updateItem={this.updateItem}
              isEditing={isEditing}
              activeItem={this.state.activeItem}
            />
          )}
        /> */}
      </div>
    );
  }
}

export default withRouter(App);
