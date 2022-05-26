import { Route, Routes, BrowserRouter } from "react-router-dom";
import ResponsiveAppBar from "./navBar";
import EmployeeList from "./employeeList";
import EmployeeForm from "./employeeForm";

export default function HomePage() {

  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/Employee-Form" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  );
}
