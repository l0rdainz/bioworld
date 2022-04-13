import {useState} from 'react';
import './App.css';
import MainMint from './MainMint';
import Nav from './Navbar.js';
import Others from './others.js';


function App() {
  const [ accounts,setAccounts] = useState([]);
  const [ items,setItems] = useState();

  async function test1(){
    console.log({items})
  }
  return (
    <div className='overlay'>
    <div className="App">
      <Nav accounts={accounts} setAccounts={setAccounts}/>
      <MainMint accounts={accounts} setAccounts={setAccounts}/>
      <Others items={items} setItems={setItems}/>
      {/* <button onClick={test1}>TEST1!</button> */}
    </div>
    <div className='moving-background'>

    </div>
    </div>
  );
}

export default App;
