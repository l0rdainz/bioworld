import {useState,useEffect} from 'react';
import './App.css';
import MainMint from './MainMint';
import Nav from './Navbar.js';
import Others from './others.js';
import WebFont from 'webfontloader';
import Marketplace from './Routes/Marketplace.js'
import Transfer from './Routes/Transfer'
import Mint from './Routes/Mint'
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

function App() {
  const [ accounts,setAccounts] = useState([]);
  const [ items,setItems] = useState([]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Nunito Sans', 'sans-serif']
      }
    });
   }, []);

  return (
    <Router>
    <div className='overlay'>
    <div className="App">
    <div className='moving-background'>
      <Nav accounts={accounts} setAccounts={setAccounts}/> 
      <MainMint /> 
      <Routes>
        <Route path='/transfer' element={<Transfer/>}></Route>
        <Route path='/marketplace' element={  <Marketplace items={items} setItems={setItems}/>}></Route>
        <Route path='/mint' element={  <Mint accounts={accounts} setAccounts={setAccounts} items={items} setItems={setItems}/>}></Route>
      </Routes>
     
    </div>
   

    </div>
    </div>
    
    </Router>
  );
}

export default App;
