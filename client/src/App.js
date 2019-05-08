import React from 'react';
import logo from './logo.svg';
import './css/style.css';
import OrderList from "./components/OrderList";
import OrderForm from "./components/OrderForm";

function App() {
  return (
    <div>
      <header></header>

      <OrderList/>

      <OrderForm/>
    </div>
  );
}

export default App;
