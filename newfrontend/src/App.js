import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Trips from './pages/trips';

// The CSS library Material UI from https://mui.com/material-ui/getting-started/overview/ was used for this assignment
// Material UI icons were also used, https://mui.com/material-ui/material-icons/ 

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Trips />} />
          <Route path="trips" element={<Trips />} />
          <Route path="login" element={<Login isLogin={true} />} />
          <Route path="register" element={<Login isLogin={false} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
