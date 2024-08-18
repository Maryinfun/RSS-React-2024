// import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import ControlledFormPage from './components/formTable';
import UncontrolledFormPage from './components/uncontrolledFormTable';
import { FormProvider, useFormContext } from './context/formContext';

const HomePage: React.FC = () => {
    const { formDataList  } = useFormContext();
  
    return (
      <>
        <nav className="main__nav">
          <Link to="/controlled-form" className="nav__link">
            Controlled Form
          </Link>
          <Link to="/uncontrolled-form" className="nav__link">
            Uncontrolled Form
          </Link>
        </nav>
        {formDataList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
          {formDataList.map((data, index) => (
                        <tr
                          key={index}
                          style={{
                            background: index === formDataList.length - 1 ? 'green' : 'transparent',
                          }}
                        >
                          <td>{data.name}</td>
                          <td>{data.age}</td>
                          <td>{data.email}</td>
                          <td>{data.gender}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
          <p>Nothing to display</p>
        )}
      </>
    );
  };
  
  function App() {
    return (
      <FormProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="controlled-form" element={<ControlledFormPage />} />
          <Route path="uncontrolled-form" element={<UncontrolledFormPage />} />
        </Routes>
      </FormProvider>
    );
  }
  
  export default App;

