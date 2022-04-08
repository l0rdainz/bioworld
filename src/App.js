import {useState} from 'react';
import './App.css';
import MainMint from './MainMint';
import Nav from './Navbar.js';
import Others from './others.js';

function App() {
  const [ accounts,setAccounts,setBalance,balance] = useState([]);
  return (
    <div className='overlay'>
    <div className="App">
      <Nav accounts={accounts} setAccounts={setAccounts} setBalance={setBalance} balance={balance}/>
      <MainMint accounts={accounts} setAccounts={setAccounts} setBalance={setBalance} balance={balance}/>
      <Others accounts={accounts} setAccounts={setAccounts} setBalance={setBalance} balance={balance}/>
    </div>
    <div className='moving-background'>

    </div>
    </div>
  );
}

export default App;
