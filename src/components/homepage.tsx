import { Route, Routes, BrowserRouter } from "react-router-dom";
import {useState} from "react";
import defaultEmpFields, { EmployeeModel } from "../employeeModel";
import ResponsiveAppBar from "./navBar";
import EmployeeList from "./employeeList";
import EmployeeForm from "./employeeForm";

export default function HomePage() {

  const [emp, setEmp] = useState<EmployeeModel>(defaultEmpFields);
  
  return (
    <BrowserRouter>
      <ResponsiveAppBar/>
      <Routes>
        <Route
          path="/"
          element={<EmployeeList setEmp={setEmp} />}
        />
        <Route
          path="/Employee-Form"
          element={
            <EmployeeForm
              selectedEmpProps={emp}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
