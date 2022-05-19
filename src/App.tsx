import './App.css';
import ButtonAppBar from './components/navBar';
import EmployeeList from './components/employeeList';
import AddEmployee from './components/addEmployees'
import {BrowserRouter, Route, Routes} from 'react-router-dom';



export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <ButtonAppBar />
        <Routes>
          <Route path = "/"  element= {<EmployeeList />}/>
          <Route path = "/Add_Employee" element = {<AddEmployee />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}