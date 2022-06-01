import "./App.css";
import LoginForm from "./components/loginPage";
import ResponsiveAppBar from "./components/navBar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import EmployeeList from "./components/employeeList";
import EmployeeForm from "./components/employeeForm";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/Employee" element={<EmployeeList />} />
          <Route path="/Employee-Form" element={<EmployeeForm />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}
