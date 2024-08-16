// import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import ControlledFormPage from './components/formTable';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <nav className='main__nav'>
                <Link to="/controlled-form" className="nav__link">
                  Controlled Form
                </Link>
                <Link to="/uncontrolled-form" className="nav__link">Uncontrolled Form</Link>
              </nav>
            </>
          }
        ></Route>
        <Route
          path="controlled-form"
          element={
            <ControlledFormPage />
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
