import { Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import EmployeeList from "./employeeList";
import EmployeeForm from "./employeeForm";
import { ToastContainer } from "react-toastify";
import LoginForm from "./loginPage";
import RegisterForm from "./registerPage";
import ResponsiveAppBar from "./navBar";

export default function HomePage() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/employee" element={<EmployeeList />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
