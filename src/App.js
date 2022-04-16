import {useState,useEffect} from 'react';
import './App.css';
import MainMint from './MainMint';
import Nav from './Navbar.js';
import Others from './others.js';
import WebFont from 'webfontloader';
import Cards from './cards.js'

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
    <div className='overlay'>
    <div className="App">
      <Nav accounts={accounts} setAccounts={setAccounts}/>
      
      <MainMint accounts={accounts} setAccounts={setAccounts}/>
     
      <Others items={items} setItems={setItems}/>
      <Cards items={items}/>
    </div>
    <div className='moving-background'>

    </div>
    </div>
  );
}

export default App;
