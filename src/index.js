import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Classlist from './Pages/Classlist';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Classlist />} />
          <Route path="classlist" element={ <Classlist /> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
