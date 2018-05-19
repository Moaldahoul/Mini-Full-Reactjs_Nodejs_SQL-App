import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state={
    products: [],
    product:{
      name:'',
      price: ''
    }
  }

  componentDidMount() {
   this.getProducts(); 
  }

  getProducts = item => {
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(response => this.setState({products: response.data}))
      .catch(err =>console.error(err))
  }

  addProduct = item => {
      const {product} =this.state;
      fetch(`http://localhost:4000/products/add?name=${product.name}&price=${product.price}`)
      .then(this.getProducts)
      .catch(err => console.log(err))
  }
  

  renderProduct = ({product_id, name}) => <div key={product_id}> {name} </div>


  render() {

    const { products, product } = this.state;

    return (
      <div className="App">
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          The products List:
        </p>

        <div>
          {products.map(this.renderProduct)}

          <div>
          <input 
                value={product.name} placeholder="Product..."
                onChange ={ event =>this.setState({product:{...product, name : event.target.value}})} />

          <input 
          value={product.price} placeholder="Price..."
          onChange ={ event =>this.setState({product:{...product, price : event.target.value}})} />
         
         <button onClick = { this.addProduct} > Add Product</button>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
