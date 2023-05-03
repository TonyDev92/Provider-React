import logo from './logo.svg';
import './App.css';
import Users from './components/users';
import { ProductsContext } from './shared/product.context';
import { useState } from 'react';
import Provider from './components/provider';

function App() {
  const [products, setProducts] = useState([]);
 
  return (
    <ProductsContext.Provider value={{products , setProducts}}>
    <div className="App">
      <div className="App-header">
      <Provider></Provider>
      </div>
    </div>
    </ProductsContext.Provider>
  );
}


export default App;
