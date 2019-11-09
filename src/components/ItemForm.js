import React, { Component} from 'react';
const initialItemState = {
  name: '',
  price: '',
  imageUrl: '',
  description: '',
  shipping: ''
};

class ItemForm extends Component {
  state = {
    item: this.props.activeItem || initialItemState,
  };

  componentDidMount(prevProps) {
    // if (!this.props.isEditing && this.state.item.name.length > 0) this.props.history.push('/new-item');

    // console.log('prevProps = ', prevProps)
    // console.log('1. this.props.activeItem =', this.props.activeItem);
    // if (
    //   this.props.activeItem &&
    //   prevProps.activeItem !== this.props.activeItem
    // ) {
    //   this.setState({
    //     item: this.props.activeItem
    //   });
    // }
  }

  changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'price') {
      value = parseInt(value, 10);
    }

    this.setState(prevState => ({
      item:{
        ...prevState.item,
        [e.target.name]: value
      }
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addItem(this.state.item);
  };

  render() {
    console.log('2. this.props.activeItem =', this.props.activeItem);
    console.log('2. this.state.item =', this.state.item);
    return (
      <div>
        {/* <h2>{this.props.isEditing ? 'Update Item' : 'Add New Item'}</h2> */}
        <h2>Add New Item</h2>
        <form onSubmit={this.handleSubmit}>
          {['name', 'price', 'imageUrl', 'description', 'shipping']
            .map((field, fieldIdx) => (
            <div key={`div-${fieldIdx}`}>
              <input
                key={fieldIdx}
                type={field === 'price' ? "number" : "text"}
                name={field}
                onChange={this.changeHandler}
                placeholder={field}
                value={this.state.item[field]}
              />
              <div key={`baseline-${fieldIdx}`} className="baseline" />
            </div>
            ))}
            <button className="md-button form-button">Add New Item</button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
