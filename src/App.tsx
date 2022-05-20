import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import ResponsiveAppBar from './components/navBar'
import EmployeeData from './components/employeeData'
import EmployeeForm from './components/employeeForm'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' element = {<EmployeeData />}/>
          <Route path='/Employee-Form' element={<EmployeeForm />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}