import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <nav>
                <ul>
                  <li>
                    <Link to="/controlled-form">Controlled Form</Link>
                  </li>
                  <li>
                    <Link to="/uncontrolled-form">Uncontrolled Form</Link>
                  </li>
                </ul>
              </nav>
            </>
          }
        ></Route>
        <Route
          path="controlled-form"
          element={
            <>
              <h1>Fill in your data</h1>
            </>
          }
        ></Route>
        <Route
          path="uncontrolled-form"
          element={
            <>
              <h1>Fill in your data</h1>
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
