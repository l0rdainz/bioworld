import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Transfer from './Routes/Transfer'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
  <Route path="/" element={<App />}></Route>
  <Route path='Transfer' element={<Transfer/>}></Route>
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />

</Routes>
</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

